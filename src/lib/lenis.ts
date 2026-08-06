type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
  start: () => void;
  stop: () => void;
};

let lenisInstance: LenisLike | null = null;

export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

export function scrollToElement(el: HTMLElement | null, offset = -40) {
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 1.35 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Pause portfolio smooth-scroll so an embed can own the wheel. */
export function pausePageScroll() {
  lenisInstance?.stop();
}

/** Resume portfolio smooth-scroll. */
export function resumePageScroll() {
  lenisInstance?.start();
}
