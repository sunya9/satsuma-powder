import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (dateString: string, withoutyear?: true) =>
  formatInTimeZone(
    dateString,
    "Asia/Tokyo",
    withoutyear ? "MM月dd日" : "y年MM月dd日"
  );
