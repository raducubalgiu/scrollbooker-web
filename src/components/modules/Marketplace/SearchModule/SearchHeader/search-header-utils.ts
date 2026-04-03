import React from "react";

type HandleMouseDownParams = {
  isExpandedRef: React.RefObject<boolean>;
  popperRef: React.RefObject<HTMLDivElement | null>;
  pillRef: React.RefObject<HTMLDivElement | null>;
  onOutsideClick: () => void;
};

export const createHandleMouseDown = ({
  isExpandedRef,
  popperRef,
  pillRef,
  onOutsideClick,
}: HandleMouseDownParams) => {
  return (e: MouseEvent) => {
    if (!isExpandedRef.current) return;

    const targetNode = e.target as Node;

    if (popperRef.current?.contains(targetNode)) return;
    if (pillRef.current?.contains(targetNode)) return;

    let el: Node | null = targetNode;

    while (el) {
      if (
        (el as HTMLElement).classList &&
        [
          "MuiPopover-root",
          "MuiMenu-root",
          "MuiMenu-paper",
          "MuiPaper-root",
          "MuiModal-root",
          "MuiMenu-list",
          "MuiList-root",
        ].some((cls) => (el as HTMLElement).classList.contains(cls))
      ) {
        return;
      }

      el = el.parentNode;
    }

    onOutsideClick();
  };
};

type UseScrollLockParams = {
  isExpanded: boolean;
  popperRef: React.RefObject<HTMLDivElement | null>;
  pillRef: React.RefObject<HTMLElement | null>;
};

export const useSearchHeaderScrollLock = ({
  isExpanded,
  popperRef,
  pillRef,
}: UseScrollLockParams) => {
  React.useEffect(() => {
    if (!isExpanded) return;

    const doc = document.documentElement;
    const body = document.body;

    const prev = {
      htmlOverflow: doc.style.overflow,
      htmlPaddingRight: doc.style.paddingRight,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
    } as const;

    const calcScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

    const applyScrollbarCompensation = () => {
      const sw = calcScrollbarWidth();
      doc.style.paddingRight = sw > 0 ? `${sw}px` : "";
    };

    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent || "");
    let savedY: number | null = null;

    if (isIOS) {
      savedY = window.scrollY || window.pageYOffset;
      body.style.position = "fixed";
      body.style.top = `-${savedY}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      doc.style.overflow = "hidden";
      applyScrollbarCompensation();
    }

    const onResize = () => {
      applyScrollbarCompensation();
      window.requestAnimationFrame(() =>
        window.dispatchEvent(new Event("resize"))
      );
    };

    window.addEventListener("resize", onResize);

    const onTouchMove = (e: TouchEvent) => {
      try {
        if (
          popperRef.current?.contains(e.target as Node) ||
          pillRef.current?.contains(e.target as Node)
        ) {
          return;
        }
      } catch {
        // defensive
      }

      e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);

      doc.style.overflow = prev.htmlOverflow;
      doc.style.paddingRight = prev.htmlPaddingRight;

      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;

      if (isIOS && savedY !== null) {
        window.scrollTo(0, savedY);
      }
    };
  }, [isExpanded, popperRef, pillRef]);
};
