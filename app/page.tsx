'use client'

import type { ViewsProps } from "react-big-calendar";
import Year from "../components/YearView";
import "../styles/calendar.css";

 import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "../components/CustomToolbar";
const localizer = momentLocalizer(moment); // or globalizeLocalizer

localizer.formats.timeGutterFormat = "HH";
localizer.formats.dayFormat = "dddd DD";

const attendanceEvents = [
  { date: new Date("2026-01-05"), total: 100, present: 92, color: "darkgreen" },
  { date: new Date("2026-01-13"), total: 100, present: 85, color: "orange" },
  { date: new Date("2026-01-21"), total: 100, present: 48, color: "red" },

  { date: new Date("2026-02-03"), total: 100, present: 64, color: "purple" },
  { date: new Date("2026-02-12"), total: 100, present: 40, color: "orange" },
  { date: new Date("2026-02-25"), total: 100, present: 78, color: "darkgreen" },

  { date: new Date("2026-03-04"), total: 100, present: 36, color: "darkpink" },
  { date: new Date("2026-03-12"), total: 100, present: 58, color: "orange" },
  { date: new Date("2026-03-15"), total: 100, present: 89, color: "darkgreen" },
  { date: new Date("2026-03-27"), total: 100, present: 72, color: "purple" },

  { date: new Date("2026-04-02"), total: 100, present: 95, color: "darkgreen" },
  { date: new Date("2026-04-09"), total: 100, present: 67, color: "orange" },
  { date: new Date("2026-04-18"), total: 100, present: 54, color: "purple" },
  { date: new Date("2026-04-26"), total: 100, present: 41, color: "red" },

  { date: new Date("2026-05-09"), total: 100, present: 67, color: "orange" },
  { date: new Date("2026-05-12"), total: 100, present: 70, color: "red" },
  { date: new Date("2026-05-21"), total: 100, present: 83, color: "darkgreen" },

  { date: new Date("2026-06-03"), total: 100, present: 30, color: "red" },
  { date: new Date("2026-06-11"), total: 100, present: 45, color: "orange" },
  { date: new Date("2026-06-19"), total: 100, present: 88, color: "darkgreen" },
  { date: new Date("2026-06-27"), total: 100, present: 62, color: "purple" },

  { date: new Date("2026-07-05"), total: 100, present: 74, color: "orange" },
  { date: new Date("2026-07-14"), total: 100, present: 59, color: "purple" },
  { date: new Date("2026-07-29"), total: 100, present: 60, color: "red" },

  { date: new Date("2026-08-06"), total: 100, present: 91, color: "darkgreen" },
  { date: new Date("2026-08-17"), total: 100, present: 52, color: "purple" },
  { date: new Date("2026-08-28"), total: 100, present: 38, color: "red" },

  { date: new Date("2026-09-04"), total: 100, present: 68, color: "orange" },
  { date: new Date("2026-09-15"), total: 100, present: 86, color: "darkgreen" },
  { date: new Date("2026-09-23"), total: 100, present: 49, color: "purple" },
];



export default function app(){
      return (
      <div className="app">
       
        <BigCalendar
          localizer={localizer}
          events={attendanceEvents}
          className = " px-3 sm:px-4 md:px-6 lg:px-[100px]"
          toolbar={true}
          views={{
            day: true,
            week: true,
            month: true,
            year: Year, // use wrapper with .title
          } as ViewsProps }
          components={{
            toolbar: CustomToolbar as any,
          }}
          messages={{ year: "Year" }}
          drilldownView={null}
        />
        
          </div>
    )

}



