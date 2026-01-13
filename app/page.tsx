
'use client'

// import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import type { ViewsProps } from "react-big-calendar";
// import moment from "moment";
import Year from "../components/YearView";
// import CustomToolbar from "../components/CustomToolbar";
import "../styles/calendar.css";

// const localizer = momentLocalizer(moment);

// // Localizer formats
// localizer.formats.yearHeaderFormat = "YYYY";
// localizer.formats.timeGutterFormat = "HH";
// localizer.formats.dayFormat = "dddd DD";

// export default function App() {
//   return (
//     <div className="h-screen">
//       <BigCalendar
//         localizer={localizer}
//         events={[]}
//         toolbar
//             views={{
//               day: true,
//               week: true,
//               month: true,
//               year: Year,
//             } as ViewsProps}
//         defaultView="month"
//         components={{
//           toolbar: CustomToolbar,
//         }}
//         messages={{ year: "Year" } }
//         style={{ height: "100%" }}
//       />
//     </div>
//   );
// }


 import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "../components/CustomToolbar";
const localizer = momentLocalizer(moment); // or globalizeLocalizer
localizer.formats.yearHeaderFormat = "YYYY";
localizer.formats.timeGutterFormat = "HH";
localizer.formats.dayFormat = "dddd DD";

// localizer.messages.year = 'Year'
export default function app(){

      return (
      <div className="app">
       
        <BigCalendar
          localizer={localizer}
          events={[]}
          toolbar={true}
          views={{
            day: true,
            week: true,
            month: true,
            year: Year,
          } as ViewsProps }
          components={{
            toolbar: CustomToolbar,
          }}
          messages={{ year: "Year" }}
          drilldownView={null}
        />
       
      </div>
    )

}



