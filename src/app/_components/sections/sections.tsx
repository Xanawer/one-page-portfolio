"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefObject,
} from "react";
import { motion } from "framer-motion";
import FlipLink from "../common/FlippingText";
import { AsciiHero } from "../ascii-art/AsciiLanding";
import Summary from "../summary/Summary";
import Experience from "../experience/Experience";
import Projects from "../project/Projects";
import Skills from "../skills/Skills";
import Contact from "../contact/Contact";

export type SectionFrame = "hero" | "content";

type SectionDefinition = {
  id: string;
  label: string;
  title: string;
  renderer: ComponentType;
  frame: SectionFrame;
};

export const SECTIONS = [
  {
    id: "ascii",
    label: "ASCII.",
    title: "ASCII",
    renderer: AsciiHero,
    frame: "hero",
  },
  {
    id: "about",
    label: "About.",
    title: "About",
    renderer: Summary,
    frame: "content",
  },
  {
    id: "experience",
    label: "Experience.",
    title: "Experience",
    renderer: Experience,
    frame: "content",
  },
  {
    id: "projects",
    label: "Projects.",
    title: "Projects",
    renderer: Projects,
    frame: "content",
  },
  {
    id: "skills",
    label: "Skills.",
    title: "Skills",
    renderer: Skills,
    frame: "content",
  },
  {
    id: "contact",
    label: "Contact.",
    title: "Contact",
    renderer: Contact,
    frame: "content",
  },
] as const satisfies readonly SectionDefinition[];

export type Section = (typeof SECTIONS)[number];
export type SectionId = Section["id"];

const HERO_FRAME_CLASS = "grid scroll-mt-6 md:scroll-mt-10";
const CONTENT_FRAME_CLASS =
  "portfolio-section w-full scroll-mt-6 py-16 sm:py-20 md:flex md:min-h-dvh md:scroll-mt-0 md:flex-col md:justify-center lg:py-28";
const CONTENT_PANEL_CLASS =
  "portfolio-panel min-w-0 border-b-2 border-gray-200 py-8 sm:py-10";
const IN_VIEW_MARGIN = "-35% 0px -55% 0px";
const VIEWPORT_ANCHOR = 0.4;

type SectionRefs = Record<SectionId, RefObject<HTMLDivElement | null>>;

function createSectionRefs(): SectionRefs {
  return Object.fromEntries(
    SECTIONS.map((section) => [section.id, { current: null }]),
  ) as SectionRefs;
}

function distanceToViewportAnchor(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const anchor = window.innerHeight * VIEWPORT_ANCHOR;
  if (rect.top <= anchor && rect.bottom >= anchor) return 0;
  return Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
}

export function selectActiveSection(
  ids: ReadonlySet<SectionId>,
  refs: SectionRefs,
) {
  return (
    SECTIONS.filter((section) => ids.has(section.id))
      .map((section, index) => {
        const element = refs[section.id].current;
        return element
          ? {
              id: section.id,
              distance: distanceToViewportAnchor(element),
              index,
            }
          : null;
      })
      .filter(
        (section): section is NonNullable<typeof section> => section !== null,
      )
      .sort(
        (left, right) =>
          left.distance - right.distance || right.index - left.index,
      )[0]?.id ?? null
  );
}

export type SectionNavigation = {
  sections: readonly Section[];
  activeId: SectionId | null;
  scrollTo: (id: SectionId) => void;
};

export function useSections() {
  const [sectionRefs] = useState<SectionRefs>(createSectionRefs);
  const [inViewIds, setInViewIds] = useState<ReadonlySet<SectionId>>(new Set());
  const [pendingId, setPendingId] = useState<SectionId | null>(null);
  const [observedActiveId, setObservedActiveId] = useState<SectionId | null>(
    null,
  );
  const observedActiveIdRef = useRef<SectionId | null>(null);
  const observedActiveAtRef = useRef(0);
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
            if (entry.isIntersecting) next.add(section.id);
            else next.delete(section.id);
            return next;
          });
        },
        { rootMargin: IN_VIEW_MARGIN },
      );
      const element = sectionRefs[section.id].current;
      if (element) observer.observe(element);
      return observer;
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      navigationCleanupRef.current?.();
    };
  }, [sectionRefs]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextActiveId = selectActiveSection(inViewIds, sectionRefs);
      if (nextActiveId !== observedActiveIdRef.current) {
        observedActiveAtRef.current = performance.now();
        observedActiveIdRef.current = nextActiveId;
      }
      setObservedActiveId(nextActiveId);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [inViewIds, sectionRefs]);

  const activeId = pendingId ?? observedActiveId;

  function scrollTo(id: SectionId) {
    const section = sectionRefs[id].current;
    if (!section) return;

    navigationCleanupRef.current?.();
    pendingIdRef.current = id;
    setPendingId(id);

    let settleTimer = 0;
    let deadlineTimer = 0;
    let cancelled = false;
    const settlementDeadline = performance.now() + 1_000;

    function cancelNavigation() {
      cancelled = true;
      window.removeEventListener("scroll", scheduleSettlement);
      window.clearTimeout(settleTimer);
      window.clearTimeout(deadlineTimer);
      if (navigationCleanupRef.current === cancelNavigation) {
        navigationCleanupRef.current = null;
      }
    }

    function finishNavigation() {
      if (cancelled) return;
      if (pendingIdRef.current === id) {
        const now = performance.now();
        const targetIsStable =
          observedActiveIdRef.current === id &&
          now - observedActiveAtRef.current >= 150;
        if (!targetIsStable && now < settlementDeadline) {
          scheduleSettlement();
          return;
        }
        pendingIdRef.current = null;
        setPendingId(null);
      }
      cancelNavigation();
    }

    function scheduleSettlement() {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(finishNavigation, 150);
    }

    window.addEventListener("scroll", scheduleSettlement, { passive: true });
    deadlineTimer = window.setTimeout(finishNavigation, 500);
    navigationCleanupRef.current = cancelNavigation;

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
    sectionRefs,
    scrollTo,
    isInView: (id: SectionId) => inViewIds.has(id),
  };
}

type SectionStackProps = {
  sections: readonly Section[];
  sectionRefs: SectionRefs;
};

function SectionFrame({
  section,
  sectionRef,
}: {
  section: Section;
  sectionRef: RefObject<HTMLDivElement | null>;
}) {
  const Renderer = section.renderer;

  if (section.frame === "hero") {
    return (
      <motion.div
        id={section.id}
        className={HERO_FRAME_CLASS}
        ref={sectionRef}
        aria-hidden="true"
      >
        <Renderer />
      </motion.div>
    );
  }

  return (
    <motion.div
      id={section.id}
      ref={sectionRef}
      className={CONTENT_FRAME_CLASS}
    >
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.15, once: true }}
        className={CONTENT_PANEL_CLASS}
      >
        <FlipLink
          text={section.title}
          href={section.id === "contact" ? "#contact" : "#"}
        />
        <br />
        <Renderer />
      </motion.div>
    </motion.div>
  );
}

export function SectionStack({ sections, sectionRefs }: SectionStackProps) {
  return (
    <>
      {sections.map((section) => (
        <SectionFrame
          key={section.id}
          section={section}
          sectionRef={sectionRefs[section.id]}
        />
      ))}
    </>
  );
}

export type Sections = ReturnType<typeof useSections>;
