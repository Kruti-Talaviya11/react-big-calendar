import "react-big-calendar";
import { ComponentType } from "react";

declare module "react-big-calendar" {
  interface ViewsProps {
    year?: boolean | ComponentType<unknown>;
  }

  interface Formats {
    yearHeaderFormat?: string;
  }

  interface Messages {
    year?: string;
  }
  export type View =
    | "month"
    | "week"
    | "work_week"
    | "day"
    | "agenda"
    | "year";
}
