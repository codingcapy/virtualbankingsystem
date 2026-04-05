import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useState } from "react";
import { DayPicker, type MonthChangeEventHandler } from "react-day-picker";
import { MONTHS, YEARS } from "../../lib/utils";
import "react-day-picker/dist/style.css";

export const Route = createFileRoute("/add/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

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
    <div className="flex flex-col pt-25">
      <div className="mx-auto">
        <div className="text-2xl text-sky-500 font-semibold">
          Create Profile
        </div>
        <form action="" className="relative flex flex-col w-[500px]">
          <input
            type="text"
            placeholder="First name"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Middle name"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Last name"
            className="px-2 py-1 my-1 border rounded"
          />
          <div className="flex">
            <div>Date of Birth</div>
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              className="ml-2 inline-block px-2 py-1 border border-[#777777] rounded w-[100px] text-left cursor-pointer"
            >
              {format(targetDate, "yyyy-MM-dd")}
            </div>
          </div>
          {showCalendar && (
            <div className="absolute top-[80px] left-[160px] scale-75">
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
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <DayPicker
                  mode="single"
                  selected={targetDate}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth as MonthChangeEventHandler}
                  onSelect={(date) => {
                    setTargetDate(date || new Date());
                    setShowCalendar(false);
                  }}
                  classNames={{ caption: "hidden" }}
                />
              </div>
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="px-2 py-1 my-1 border rounded"
          />
          <button className="bg-sky-500 rounded my-5 py-2 text-white cursor-pointer hover:bg-sky-400 transition-all ease-in-out duration-300z">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}
