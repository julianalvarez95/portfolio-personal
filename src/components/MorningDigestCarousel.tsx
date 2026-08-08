"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { formatDigestDate } from "@/lib/format";
import type { DigestSlide } from "@/lib/digest";
import styles from "./MorningDigestCarousel.module.css";

const AUTO_ADVANCE_MS = 7000;

export function MorningDigestCarousel({ slides }: { slides: DigestSlide[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  useEffect(() => {
    if (!inView || paused || reduceMotionRef.current || slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [inView, paused, slides.length]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  if (slides.length === 0) return null;

  return (
    <div
      ref={ref}
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Morning digest — live output from homelab-gitops"
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <article
              className={styles.slide}
              key={`${slide.generatedAt}-${slide.headline}`}
              aria-hidden={i !== index}
            >
              <div className={styles.meta}>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <span className={styles.date}>
                  {formatDigestDate(slide.generatedAt)} · {slide.source}
                </span>
              </div>
              <h4 className={styles.headline}>{slide.headline}</h4>
              <p className={styles.summary}>{slide.summary}</p>
              <a
                className={styles.link}
                href={slide.url}
                target="_blank"
                rel="noreferrer"
                tabIndex={i === index ? 0 : -1}
              >
                Read source ↗
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(index - 1)}
          aria-label="Previous digest item"
        >
          ‹
        </button>
        <div
          className={styles.progress}
          data-draining={
            inView && !paused && slides.length > 1 ? "" : undefined
          }
        >
          {/* key={index} remounts the fill on every advance, restarting its
              CSS animation from empty — a continuous per-cycle drain instead
              of a per-slide snap, so the bar reads as still running right
              now instead of a static step function. */}
          <div key={index} className={styles.progressFill} />
        </div>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(index + 1)}
          aria-label="Next digest item"
        >
          ›
        </button>
      </div>
    </div>
  );
}
