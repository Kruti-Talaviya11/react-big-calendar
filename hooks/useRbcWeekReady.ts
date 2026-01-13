import { useEffect } from "react";

export function useRbcWeekReady(view: string) {
  useEffect(() => {
    if (view !== "week") return;

    const root = document.querySelector(".rbc-time-view");
    if (!root) return;

    root.classList.remove("rbc-ready");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.add("rbc-ready");
      });
    });
  }, [view]);
}
    