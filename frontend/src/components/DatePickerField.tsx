import { useState, useMemo } from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { DayPicker, type MonthChangeEventHandler } from "react-day-picker";
import { MONTHS, START_YEAR } from "../lib/utils";

export function DatePickerField(props: {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  fromDate?: Date;
  toDate?: Date;
  endYear?: number;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(props.value);
  const years = useMemo(() => {
    const end = props.endYear ?? new Date().getFullYear();
    return Array.from(
      { length: end - START_YEAR + 1 },
      (_, i) => START_YEAR + i,
    );
  }, [props.endYear]);

  function handleMonthDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = new Date(calendarMonth);
    newMonth.setMonth(parseInt(e.target.value));
    setCalendarMonth(newMonth);
  }

  function handleYearDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = new Date(calendarMonth);
    newMonth.setFullYear(parseInt(e.target.value));
    setCalendarMonth(newMonth);
  }

  return (
    <div className="flex items-center">
      <div>{props.label}:</div>
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="ml-2 mb-1 inline-block px-2 py-1 border border-[#777777] rounded w-[100px] text-left cursor-pointer"
      >
        {format(props.value, "yyyy-MM-dd")}
      </div>
      {showCalendar && (
        <div className="absolute top-[75px] left-[160px] scale-75">
          <div className="bg-white border rounded p-2">
            <div className="flex justify-between items-center gap-1 px-1 pb-2">
              <select
                value={calendarMonth.getMonth()}
                onChange={handleMonthDropdown}
                className="rounded px-1 py-0.5 cursor-pointer"
              >
                {MONTHS.map((month, i) => (
                  <option key={month} value={i}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={calendarMonth.getFullYear()}
                onChange={handleYearDropdown}
                className="rounded px-1 py-0.5 cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <DayPicker
              mode="single"
              selected={props.value}
              month={calendarMonth}
              onMonthChange={setCalendarMonth as MonthChangeEventHandler}
              onSelect={(date) => {
                props.onChange(date || new Date());
                setShowCalendar(false);
              }}
              disabled={[
                ...(props.fromDate ? [{ before: props.fromDate }] : []),
                ...(props.toDate ? [{ after: props.toDate }] : []),
              ]}
              classNames={{ caption: "hidden" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
