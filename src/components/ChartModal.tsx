import { useState } from "react";
import { useDispatch } from "react-redux";

import { getVTRequest } from "@/store/vt/actions";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  vtName: string;
  children?: React.ReactNode;
}

export default function ChartModal({
  isOpen,
  onClose,
  vtName,
  children,
}: ChartModalProps) {
  const dispatch = useDispatch();

  /**
   * Date Filters
   */
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /**
   * From Time
   */
  const [fromHour, setFromHour] = useState("");
  const [fromMinute, setFromMinute] = useState("");
  const [fromSecond, setFromSecond] = useState("");

  /**
   * To Time
   */
  const [toHour, setToHour] = useState("");
  const [toMinute, setToMinute] = useState("");
  const [toSecond, setToSecond] = useState("");

  /**
   * Apply Filter
   */
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();

    const formattedFromDate = fromDate
      ? fromDate.split("-").reverse().join("-")
      : "";

    const formattedToDate = toDate ? toDate.split("-").reverse().join("-") : "";

    const fromTime =
      fromHour && fromMinute && fromSecond
        ? `${fromHour}:${fromMinute}:${fromSecond}`
        : "";

    const toTime =
      toHour && toMinute && toSecond ? `${toHour}:${toMinute}:${toSecond}` : "";

    dispatch(
      getVTRequest({
        vtName,
        filters: {
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          fromTime,
          toTime,
        },
      })
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl w-full max-w-6xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{vtName} Analytics</h2>

          <button onClick={onClose} className="px-3 py-1 border rounded">
            Close
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* From Date */}
          <div>
            <label className="block mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          {/* From Time */}
          <div>
            <label className="block mb-2">From Time</label>

            <div className="flex gap-2">
              <select
                value={fromHour}
                onChange={(e) => setFromHour(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">HH</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={fromMinute}
                onChange={(e) => setFromMinute(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">MM</option>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={fromSecond}
                onChange={(e) => setFromSecond(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">SS</option>
                {Array.from({ length: 131 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Time */}
          <div>
            <label className="block mb-2">To Time</label>

            <div className="flex gap-2">
              <select
                value={toHour}
                onChange={(e) => setToHour(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">HH</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={toMinute}
                onChange={(e) => setToMinute(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">MM</option>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={toSecond}
                onChange={(e) => setToSecond(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">SS</option>
                {Array.from({ length: 131 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mb-6">
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply Filter
          </button>
        </div>

        {/* Chart Section */}
        <div className="border rounded-lg p-4">{children}</div>
      </div>
    </div>
  );
}
