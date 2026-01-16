import React from "react";
import moment from "moment";
import type { Moment } from "moment";




// Type definitions
interface MomentWithCalendar extends Moment {
  calendarRef?: CalendarArray;
}

interface CalendarArray extends Array<MomentWithCalendar[]> {
  currentDate: Moment;
  year: number;
  month: number;
}

interface CalendarDateProps {
  dateToRender: MomentWithCalendar;
  dateOfMonth: Moment;
  onClick: (date: MomentWithCalendar) => void;
  events?: AttendanceEvent;
}


interface CalendarProps {
  date: Date | Moment;
  events: AttendanceEvent[];
  
}

interface CalendarState {
  calendar: CalendarArray | null;
}

interface YearProps {
  date: Date | Moment;
  events: AttendanceEvent[];
}

interface AttendanceEvent {
  date: Date;
  total: number;
  present: number;
  color: string;
}

function getEventForDate(
  date: Moment,
  events: AttendanceEvent[]
) {
  return events.find(event =>
    moment(event.date).isSame(date, "day")
  );
}

function AttendanceCircle({
  present,
  total,
  color,
  isOutside,
}: {
  present: number;
  total: number;
  color: string;
  isOutside: boolean;
}) {
  if (!total) return null;

  const angle = (present / total) * 360;

  return (
    <div
      className={`
        absolute
        h-6 w-6 sm:h-7 sm:w-7
        rounded-full
        ${isOutside ? "opacity-40" : "opacity-100"}
      `}
      style={{
        background: `
          conic-gradient(
            ${color} 0deg ${angle}deg,
            color-mix(in srgb, ${color} 30%, white) ${angle}deg 360deg
          )
        `,
      }}
    />
  );
}


/* =========================
   CALENDAR GENERATOR (6 WEEKS)
========================= */

function createCalendar(currentDate: Date | Moment): CalendarArray {
  const date = currentDate ? moment(currentDate) : moment();

  const startOfMonth = date.clone().startOf("month");
  const startOfGrid = startOfMonth.clone().startOf("week");

  const calendar = [] as unknown as CalendarArray;
  calendar.currentDate = date;
  calendar.year = date.year();
  calendar.month = date.month();

  for (let week = 0; week < 6; week++) {
    const weekRow: MomentWithCalendar[] = [];
    calendar.push(weekRow);

    for (let day = 0; day < 7; day++) {
      const dayDate = startOfGrid.clone().add(week * 7 + day, "days") as MomentWithCalendar;
      dayDate.calendarRef = calendar;
      weekRow.push(dayDate);
    }
  }

  return calendar;
}

/* =========================
   DATE CELL
========================= */

function CalendarDate({ dateToRender, dateOfMonth, onClick , events}: CalendarDateProps) {
  const present = events?.present ?? 0;
  const total = events?.total ?? 0;

  const isToday =
    dateToRender.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");

  const isPrev = dateToRender.month() < dateOfMonth.month();
  const isNext = dateToRender.month() > dateOfMonth.month();
  const isOutside = isPrev || isNext;

  return (
    <button
      disabled={isOutside}
      onClick={() => !isOutside && onClick(dateToRender)}
      className={`
        relative overflow-hidden
        h-8 sm:h-9 lg:h-10
        w-full
        flex items-center justify-center
        text-[11px] sm:text-xs md:text-sm
        border border-gray-200
      `}
    >
        {events && (
        <AttendanceCircle
          present={events.present}
          total={events.total}
          color={events.color}
          isOutside={isOutside}
        />
      )}

      {/* Date number always on top */}
      <span
        className={`
          relative z-10 font-medium
          ${
            events
              ? "text-white"        // ✅ event always wins
              : isOutside
              ? "text-gray-400"     // outside & no event
              : "text-gray-900"     // normal
          }
        `}
      >
        {dateToRender.date()}
      </span>
    </button>

  );
}

/* =========================
   MONTH VIEW
========================= */

class Calendar extends React.Component<CalendarProps, CalendarState> {
  state: CalendarState = {
    calendar: null,
  };

  componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) });
  }

  componentDidUpdate(prevProps: CalendarProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) });
    }
  }

  render() {
    const { calendar } = this.state;
    const { events } = this.props;
    if (!calendar) return null;

    return (
      <div className="flex flex-col px-2 md:px-3 lg:px-4">
        <div className="pt-3 pb-2 text-sm font-semibold">
          {calendar.currentDate.format("MMMM")}
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="h-8 flex items-center justify-center text-xs text-gray-400 border-b border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {calendar.map((week, index) => (
            <div key={index} className="grid grid-cols-7">
              {week.map((date) => {
                const event = getEventForDate(date, events);

                return (
                  <CalendarDate
                    key={date.format("YYYY-MM-DD")}
                    dateToRender={date}
                    dateOfMonth={calendar.currentDate}
                    onClick={() => {}}
                    events={event}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

/* =========================
   YEAR VIEW
========================= */

class Year extends React.Component<YearProps> {
  static range = (date: Date | Moment) => {
    return [moment(date).startOf("year").toDate()];
  };

  static navigate = (date: Date | Moment, action: string) => {
    switch (action) {
      case "PREV":
        return moment(date).subtract(1, "year").toDate();
      case "NEXT":
        return moment(date).add(1, "year").toDate();
      default:
        return date;
    }
  };

  static title = (date: Date | Moment, { localizer }: any) => {
    return localizer.format(date, "yearHeaderFormat");
  };

  render() {
    const { date, events } = this.props;
    const firstMonth = moment(date).startOf("year");

    return (
<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full py-6 overflow-y-auto no-scrollbar">
        {Array.from({ length: 12 }).map((_, i) => (
          <Calendar
            key={i}
            date={firstMonth.clone().add(i, "month").toDate()}
            events={events}
          />
        ))}
      </div>
    );
  }
}


export default Year;
