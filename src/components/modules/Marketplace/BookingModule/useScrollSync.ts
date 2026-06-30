import { UserProducts } from "@/ts/models/booking/product/Product";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  RefObject,
} from "react";

export interface ScrollSyncResult {
  currentTab: number;
  indicatorStyle: {
    width: number;
    height: number;
    x: number;
    y: number;
    ready: boolean;
  };
  canScrollLeft: boolean;
  canScrollRight: boolean;
  sectionRefs: RefObject<Record<number, HTMLDivElement | null>>;
  tabsContainerRef: RefObject<HTMLDivElement | null>;
  tabItemRefs: RefObject<Record<number, HTMLButtonElement | null>>;
  scrollToSection: (index: number) => void;
  checkTabsOverflow: () => void;
}

export const useScrollSync = (
  products: UserProducts,
  offset: number
): ScrollSyncResult => {
  const [currentTab, setCurrentTab] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    ready: false,
  });

  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabItemRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkTabsOverflow = useCallback(() => {
    const el = tabsContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  }, []);

  const updateIndicator = useCallback((index: number) => {
    const container = tabsContainerRef.current;
    const activeTab = tabItemRefs.current[index];
    if (!container || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeTab.getBoundingClientRect();

    // 1. Calculăm și setăm stilul indicatorului (rămâne neschimbat, funcționează corect)
    setIndicatorStyle({
      width: activeRect.width,
      height: activeRect.height,
      x: activeRect.left - containerRect.left + container.scrollLeft,
      y: activeRect.top - containerRect.top,
      ready: true,
    });

    // 2. --- REZOLVARE MOBIL: Înlocuim scrollIntoView ---
    // Calculăm unde ar trebui să fie scroll-ul containerului ca tab-ul să fie pe centru
    const targetScrollLeft =
      activeTab.offsetLeft - containerRect.width / 2 + activeRect.width / 2;

    // Dăm scroll strict containerului de tab-uri, fără să afectăm body-ul paginii
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
      const target = sectionRefs.current[index];
      if (!target) return;
      isClickScrolling.current = true;
      setCurrentTab(index);

      const y =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 850);
    },
    [offset]
  );

  useEffect(() => {
    if (products.total_count === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentTab(index);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [products, offset]);

  useLayoutEffect(() => {
    updateIndicator(currentTab);
  }, [currentTab, updateIndicator, products]);

  return {
    currentTab,
    indicatorStyle,
    canScrollLeft,
    canScrollRight,
    sectionRefs,
    tabsContainerRef,
    tabItemRefs,
    scrollToSection,
    checkTabsOverflow,
  };
};
