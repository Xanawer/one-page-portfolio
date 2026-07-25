"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type SectionId =
  "ascii" | "about" | "experience" | "projects" | "skills" | "contact";

export type Section = {
  id: SectionId;
  label: string;
  inViewMargin: string;
};

export const SECTIONS: Section[] = [
  { id: "ascii", label: "ASCII.", inViewMargin: "-35% 0px -55% 0px" },
  { id: "about", label: "About.", inViewMargin: "-35% 0px -55% 0px" },
  {
    id: "experience",
    label: "Experience.",
    inViewMargin: "-35% 0px -55% 0px",
  },
  { id: "projects", label: "Projects.", inViewMargin: "-35% 0px -55% 0px" },
  { id: "skills", label: "Skills.", inViewMargin: "-35% 0px -55% 0px" },
  { id: "contact", label: "Contact.", inViewMargin: "-35% 0px -55% 0px" },
];

const ACTIVE_PRIORITY: SectionId[] = [
  "contact",
  "skills",
  "projects",
  "experience",
  "ascii",
  "about",
];

export function useSections() {
  const refs = useRef<Record<SectionId, RefObject<HTMLDivElement | null>>>({
    ascii: { current: null },
    about: { current: null },
    experience: { current: null },
    projects: { current: null },
    skills: { current: null },
    contact: { current: null },
  });
  const [inViewIds, setInViewIds] = useState<ReadonlySet<SectionId>>(new Set());
  const [pendingId, setPendingId] = useState<SectionId | null>(null);
  const pendingIdRef = useRef<SectionId | null>(null);
  const navigationCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const observers = SECTIONS.map((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          setInViewIds((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(section.id);
            } else {
              next.delete(section.id);
            }
            return next;
          });
        },
        { rootMargin: section.inViewMargin },
      );
      const element = refs.current[section.id].current;
      if (element) observer.observe(element);
      return observer;
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      navigationCleanupRef.current?.();
    };
  }, []);

  const observedActiveId =
    ACTIVE_PRIORITY.find((id) => inViewIds.has(id)) ?? null;
  const activeId = pendingId ?? observedActiveId;

  function scrollTo(id: SectionId) {
    const section = refs.current[id].current;
    if (!section) return;

    pendingIdRef.current = id;
    setPendingId(id);
    navigationCleanupRef.current?.();

    let settleTimer = 0;
    const finishNavigation = () => {
      if (pendingIdRef.current === id) {
        pendingIdRef.current = null;
        setPendingId(null);
      }
      window.removeEventListener("scroll", scheduleSettlement);
      window.clearTimeout(settleTimer);
      navigationCleanupRef.current = null;
    };
    const scheduleSettlement = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(finishNavigation, 150);
    };
    window.addEventListener("scroll", scheduleSettlement, { passive: true });
    navigationCleanupRef.current = finishNavigation;

    window.history.replaceState(null, "", `#${id}`);
    section.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "nearest",
    });
    scheduleSettlement();
  }

  return {
    sections: SECTIONS,
    activeId,
    refFor: (id: SectionId) => refs.current[id],
    scrollTo,
    isInView: (id: SectionId) => inViewIds.has(id),
  };
}

export type Sections = ReturnType<typeof useSections>;
