// One passive `pointermove` listener for the whole page, batched to a
// single requestAnimationFrame per tick, fanning out to every subscriber.
// Replaces the pattern of each component (ArchiveRow, StatBlock,
// useMagnetic, ...) registering its own `window.addEventListener` and
// calling `getBoundingClientRect()` synchronously inside the handler —
// harmless at a handful of instances, but this page runs 25+ of them
// simultaneously, each forcing a layout read on every mousemove.

export type PointerPosition = { x: number; y: number };
type Listener = (position: PointerPosition) => void;

const listeners = new Set<Listener>();
let pending: PointerPosition | null = null;
let frame = 0;
let attached = false;

function flush() {
  frame = 0;
  if (!pending) return;
  const position = pending;
  for (const listener of listeners) listener(position);
}

function handlePointerMove(e: PointerEvent) {
  pending = { x: e.clientX, y: e.clientY };
  if (!frame) frame = requestAnimationFrame(flush);
}

function attach() {
  if (attached) return;
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  attached = true;
}

function detach() {
  if (!attached) return;
  window.removeEventListener("pointermove", handlePointerMove);
  attached = false;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  pending = null;
}

/** Subscribes to page-wide pointer movement. Returns an unsubscribe function. */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  attach();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}
