import { useState, useEffect, useRef, useMemo } from "react";
import { BusinessProfileTabSection } from "./BusinessProfileModule";

export const useBusinessProfileScroll = (
  tabSections: BusinessProfileTabSection[]
) => {
  const [isTabsVisible, setIsTabsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    tabSections[0]?.id ?? "services"
  );

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    photos: null,
    services: null,
    social: null,
    reviews: null,
    about: null,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      const servicesElement = sectionRefs.current["services"];
      if (servicesElement) {
        const rect = servicesElement.getBoundingClientRect();
        const shouldBeVisible = rect.top <= 80;
        if (isTabsVisible !== shouldBeVisible) {
          setIsTabsVisible(shouldBeVisible);
        }
      }

      const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;
      const activationOffset = stickyTabsHeight + 100;

      let currentActiveTab = tabSections[0]?.id ?? "services";

      for (const section of tabSections) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= activationOffset) {
          currentActiveTab = section.id;
        }
      }

      setActiveTab((prev) =>
        prev !== currentActiveTab ? currentActiveTab : prev
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTabsVisible, tabSections]);

  const scrollToSection = (sectionId: string): void => {
    const element = sectionRefs.current[sectionId];
    if (!element) return;

    const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;
    const top =
      window.scrollY +
      element.getBoundingClientRect().top -
      stickyTabsHeight -
      12;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    value: string
  ): void => {
    setActiveTab(value);
    scrollToSection(value);
  };

  const sectionRefCallbacks = useMemo(
    () => ({
      photos: (el: HTMLElement | null) => {
        sectionRefs.current.photos = el;
      },
      services: (el: HTMLElement | null) => {
        sectionRefs.current.services = el;
      },
      social: (el: HTMLElement | null) => {
        sectionRefs.current.social = el;
      },
      reviews: (el: HTMLElement | null) => {
        sectionRefs.current.reviews = el;
      },
      about: (el: HTMLElement | null) => {
        sectionRefs.current.about = el;
      },
    }),
    []
  );

  return {
    tabsContainerRef,
    isTabsVisible,
    activeTab,
    handleTabChange,
    sectionRefCallbacks,
  };
};
