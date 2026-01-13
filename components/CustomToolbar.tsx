import React from "react";
import moment from "moment";
import type { ToolbarProps, View } from "react-big-calendar";

type CalendarView = "year" | "month" | "week";

const CustomToolbar: React.FC<ToolbarProps> = ({
  date,
  view,
  onNavigate,
  onView,
}) => {
  const goToToday = () => onNavigate("TODAY");
  const goToPrev = () => onNavigate("PREV");
  const goToNext = () => onNavigate("NEXT");

  const setView = (v: CalendarView) => {
    onView(v as unknown as View);
  };

  const getLabel = (): string => {
    const m = moment(date);
    const currentView = view as CalendarView;
    if (currentView === "year") return m.format("YYYY");
    if (currentView === "month") return m.format("MMMM");
    if (currentView === "week") {
      const start = m.clone().startOf("week");
      const end = m.clone().endOf("week");
      return `${start.format("MMM DD")} – ${end.format("MMM DD")}`;
    }
    return "";
  };

  return (
    <div
      className="
        flex flex-col gap-3
        sm:flex-row md:items-center md:justify-between
        px-4 md:px-[140px] py-3
      "
    >
      {/* TOP (mobile) / LEFT (desktop): Today + arrows + label */}
      <div
        className="
          flex items-center justify-between gap-3
          order-1 sm:order-2
        "
      >
        <button
          type="button"
          onClick={goToToday}
          className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm"
        >
          Today
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-lg"
          >
            ‹
          </button>

          <span className="
  min-w-[64px]
  text-center
  font-normal
  text-xs
  sm:text-sm
  whitespace-nowrap
">
            {getLabel()}
          </span>

          <button
            type="button"
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-lg"
          >
            ›
          </button>
        </div>
      </div>

      {/* BOTTOM (mobile) / LEFT (desktop): View switch */}
      <div
        className="
          inline-flex w-full md:w-auto
          overflow-hidden rounded-full border border-gray-300 bg-white
          order-2 sm:order-1
        "
      >
        {(["year", "week", "month"] as CalendarView[]).map((v, idx) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`
              flex-1 md:flex-none
              px-4 py-1.5 text-sm
              ${
                view === v
                  ? "bg-gray-200 font-semibold text-black"
                  : "text-gray-500"
              }
              ${idx !== 2 ? "border-r border-gray-300" : ""}
            `}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomToolbar;