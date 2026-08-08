// Lazily creates one IntersectionObserver per named group ("work",
// "archive", ...), mirroring Nav.tsx's own section-tracking band
// (`rootMargin: "-40% 0px -55% 0px"`) so "the step being built now" reads
// consistently with whichever section the nav itself highlights. When more
// than one item in a group intersects the band at once, the first
// registered (DOM order, in practice) wins — mirrors Nav's own
// forEach-overwrite behavior on overlapping entries.

type Listener = (activeId: string | null) => void;

type Group = {
  observer: IntersectionObserver;
  elements: Map<Element, string>;
  intersecting: Set<Element>;
  listeners: Set<Listener>;
  activeId: string | null;
};

const ROOT_MARGIN = "-40% 0px -55% 0px";
const groups = new Map<string, Group>();

function recompute(group: Group) {
  let next: string | null = null;
  for (const el of group.elements.keys()) {
    if (group.intersecting.has(el)) {
      next = group.elements.get(el) ?? null;
      break;
    }
  }
  if (next === group.activeId) return;
  group.activeId = next;
  for (const listener of group.listeners) listener(next);
}

function getGroup(name: string): Group {
  const existing = groups.get(name);
  if (existing) return existing;

  const group: Group = {
    elements: new Map(),
    intersecting: new Set(),
    listeners: new Set(),
    activeId: null,
    observer: new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) group.intersecting.add(entry.target);
          else group.intersecting.delete(entry.target);
        }
        recompute(group);
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 }
    ),
  };

  groups.set(name, group);
  return group;
}

/**
 * Registers `el` as item `id` within `group`, subscribing `listener` to
 * that group's active-id changes. Returns an unregister function; the
 * group's observer tears itself down once its last item unregisters.
 */
export function register(
  group: string,
  id: string,
  el: Element,
  listener: Listener
): () => void {
  const g = getGroup(group);
  g.elements.set(el, id);
  g.listeners.add(listener);
  g.observer.observe(el);

  return () => {
    g.elements.delete(el);
    g.intersecting.delete(el);
    g.listeners.delete(listener);
    g.observer.unobserve(el);
    if (g.activeId === id) recompute(g);
    if (g.elements.size === 0) {
      g.observer.disconnect();
      groups.delete(group);
    }
  };
}
