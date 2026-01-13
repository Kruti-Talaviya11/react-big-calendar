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
}

interface CalendarProps {
  date: Date | Moment;
}

interface CalendarState {
  calendar: CalendarArray | null;
}

interface YearProps {
  date: Date | Moment;
}

// interface LocalizerFormat {
//   localizer: {
//     format: (date: Date | Moment, format: string) => string;
//   };
// }

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

function CalendarDate({ dateToRender, dateOfMonth, onClick }: CalendarDateProps) {
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
  h-8 sm:h-9 lg:h-10
  flex
  items-center
  justify-center
  text-[11px] sm:text-xs md:text-sm
  border
  border-gray-200
  ${
    isOutside
      ? "text-gray-400 bg-white"
      : isToday
      ? "bg-gray-300"
      : "bg-white hover:bg-gray-100"
  }
`}

    >
      {dateToRender.date()}
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
    if (!calendar) return null;

    return (
      <div className="flex flex-col px-2 sm:px-2 md:px-3 lg:px-4">


        {/* MONTH TITLE */}
        
  <div
  className="
    pt-3
    pb-2
    text-sm
    font-semibold
    text-center
    capitalize
    sm:text-base
    sm:text-left
  "
>

          {calendar.currentDate.format("MMMM")}
        </div>

        {/* MONTH CARD */}
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
          {/* WEEK HEADER (7-COLUMN GRID — THIS WAS MISSING ❗) */}
          <div className="grid grid-cols-7 bg-gray-50">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
              className="h-8 sm:h-9 flex items-center justify-center text-xs sm:text-sm text-gray-400 border-b border-r border-gray-200 last:border-r-0"

              >
                {day}
              </div>
            ))}
          </div>

          {/* DATE GRID (EACH WEEK = 7-COLUMN GRID ❗) */}
          {calendar.map((week, index) => (
            <div key={index} className="grid grid-cols-7">
              {week.map((date) => (
                <CalendarDate
                  key={date.format("YYYY-MM-DD")}
                  dateToRender={date}
                  dateOfMonth={calendar.currentDate}
                  onClick={() => {}}
                />
              ))}
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


  static title = (
  date: Date | Moment,
  { localizer }: { localizer: { format: (d: Date | Moment, f: string) => string } }
) => {
  return localizer.format(date, "yearHeaderFormat");
};


  render() {
    const { date } = this.props;
    const months = [];
    const firstMonth = moment(date).startOf("year");

    for (let i = 0; i < 12; i++) {
      months.push(
       <Calendar
      key={i}
      date={firstMonth.clone().add(i, "month").toDate()}
    />
      );
    }

    return (
    
  <div
  className="
    grid
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-3
    xl:grid-cols-4

    gap-x-0.5 gap-y-3
    sm:gap-x-2 sm:gap-y-3
    md:gap-x-3 md:gap-y-4
    lg:gap-x-5 lg:gap-y-7

    px-3
    sm:px-3
    md:px-4
    lg:px-16
    xl:px-20

    h-full
    overflow-y-auto
    min-w-0
  "
>
        {months}
      </div>
    );
  }
}

export default Year;
