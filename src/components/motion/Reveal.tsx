"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Owns the IntersectionObserver and the one-shot semantics — owns zero
 * animation. Stamps `data-revealed` on a wrapper element once, then
 * disconnects; each section authors its own entrance against
 * `[data-revealed]` in its own .module.css. Producing an identical
 * entrance everywhere would mean copy-pasting that CSS, which is the
 * point — this component is shaped so a uniform default isn't an option
 * here.
 *
 * No special-case for prefers-reduced-motion: reduce — deliberately.
 * globals.css already forces every transition/animation duration (and
 * tokens.css's --stagger-* delays) to ~0 under that media query, so
 * whatever a section authors against [data-revealed] is already
 * instantaneous once reduced motion is on; gating *when* data-revealed
 * flips here too would just be a second, redundant switch on the same
 * condition.
 *
 * `children` is a prop, so a server subtree passed in stays server-only —
 * it's serialized across the boundary, not pulled into this client bundle.
 */
export function Reveal({
  children,
  className,
  threshold = 0.2,
  rootMargin,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className} data-revealed={revealed || undefined}>
      {children}
    </div>
  );
}
