import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { useData } from "@/store/DataContext";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ReferenceLine,
  Legend,
} from "recharts";
import { getComparison } from "@/store/comparison/actions";

import type { GeneratorRecord } from "@/types/generator";
import { computeCorrelation } from "@/utils/analytics";

const CustomTooltip = ({ active, payload, xParameter, yParameter }: any) => {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg shadow-lg p-4 min-w-[250px]">
      <div className="font-bold text-red-600 mb-2">
        {xParameter}: {point.x}
      </div>

      <div className="space-y-1 text-sm">
        <div>
          <strong>{yParameter}</strong>: {point.y}
        </div>
      </div>
    </div>
  );
};

export default function ComparisonPage() {
  const { data } = useData();

  const dispatch = useDispatch();

  const { comparisonData, loading } = useSelector(
    (state: any) => state.comparison
  );

  const [xParameter, setXParameter] = useState("");
  const [yParameter, setYParameter] = useState("");
  const [testCondition, setTestCondition] = useState("all");
  const [operatingMode, setOperatingMode] = useState("all");
  const [selectedPoint, setSelectedPoint] = useState<GeneratorRecord | null>(
    null
  );
  const [selectedCoords, setSelectedCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  if (!data) return null;
  const parameterMapping: Record<string, string> = {
    "VT1(V)": "VT1",
    "VT2(V)": "VT2",
    "VT3(V)": "VT3",
    "VT4(V)": "VT4",
    "VT5(V)": "VT5",
    "VT6(V)": "VT6",
    "VT7(V)": "VT7",
    "VT8(V)": "VT8",
    "VT9(V)": "VT9",

    "BUG Speed": "BUG_Speed",
    "BUG Torque": "BUG_Torque",

    "Ambient temperature": "Ambient_temperature",

    "Ambient humidity": "Ambient_humidity",

    "Ambient pressure": "Ambient_pressure",

    Vibration: "vibration",
  };

  const numericParameters = data.numericParameters;

  const testConditions = useMemo(() => {
    const values = new Set<string>();

    data.records.forEach((record) => {
      const value = String(record["Test_condition"] ?? "").trim();
      if (value) values.add(value);
    });

    return [...values];
  }, [data]);

  const operatingModes = useMemo(() => {
    const values = new Set<string>();

    data.records.forEach((record) => {
      const value = String(record["Operating_mode"] ?? "").trim();
      if (value) values.add(value);
    });

    return [...values];
  }, [data]);
useEffect(() => {
  if (xParameter && yParameter) {

    console.log("X:", xParameter);
    console.log("Y:", yParameter);
    console.log("Dispatching API...");

    dispatch(
      getComparison({
        xParameter:
          parameterMapping[xParameter] || xParameter,

        yParameter:
          parameterMapping[yParameter] || yParameter,
      })
    );
  }
}, [xParameter, yParameter]);

  // const chartData = useMemo(() => {
  //   if (!xParameter || !yParameter) return [];

  //   return data.records
  //     .filter((record) => {
  //       const x = Number(record[xParameter]);
  //       const y = Number(record[yParameter]);

  //       if (isNaN(x) || isNaN(y)) return false;

  //       if (
  //         testCondition !== "all" &&
  //         record["Test_condition"] !== testCondition
  //       ) {
  //         return false;
  //       }

  //       if (
  //         operatingMode !== "all" &&
  //         record["Operating_mode"] !== operatingMode
  //       ) {
  //         return false;
  //       }

  //       return true;
  //     })
  //     .map((record) => ({
  //       x: Number(record[xParameter]),
  //       y: Number(record[yParameter]),
  //       raw: record,
  //     }))
  //     .sort((a, b) => a.x - b.x);
  // }, [data, xParameter, yParameter, testCondition, operatingMode]);
  // const correlation = useMemo(() => {
  //   if (chartData.length < 2) return 0;

  //   return computeCorrelation(
  //     chartData.map((p) => p.x),
  //     chartData.map((p) => p.y)
  //   );
  // }, [chartData]);
  const chartData = comparisonData || [];
  const correlation = useMemo(() => {
    if (chartData.length < 2) return 0;

    return computeCorrelation(
      chartData.map((p: any) => p.x),
      chartData.map((p: any) => p.y)
    );
  }, [chartData]);
  return (
    <div>
      <PageHeader
        title="Parameter Comparison Workspace"
        description="Analyze relationships between any two generator parameters and discover engineering insights."
        insight="Select any two parameters to explore dependency, correlation and operational behaviour."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-border p-6 mb-6"
      >
        <h3 className="text-[15px] font-semibold text-text-primary mb-5">
          Comparison Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              X Parameter
            </label>

            <select
              value={xParameter}
              onChange={(e) => setXParameter(e.target.value)}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2"
            >
              <option value="">Select Parameter</option>

              {numericParameters.map((param) => (
                <option key={param.originalName} value={param.originalName}>
                  {param.originalName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Y Parameter
            </label>

            <select
              value={yParameter}
              onChange={(e) => setYParameter(e.target.value)}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2"
            >
              <option value="">Select Parameter</option>

              {numericParameters.map((param) => (
                <option key={param.originalName} value={param.originalName}>
                  {param.originalName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Test Condition
            </label>

            <select
              value={testCondition}
              onChange={(e) => setTestCondition(e.target.value)}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2"
            >
              <option value="all">All</option>

              {testConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Operating Mode
            </label>

            <select
              value={operatingMode}
              onChange={(e) => setOperatingMode(e.target.value)}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2"
            >
              <option value="all">All</option>

              {operatingModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                dispatch(
                  getComparison({
                    xParameter: parameterMapping[xParameter] || xParameter,

                    yParameter: parameterMapping[yParameter] || yParameter,
                  })
                );
              }}
              className="w-full bg-accent text-white rounded-lg py-2.5 font-medium hover:bg-[#1D4ED8]"
            >
              Apply Analysis
            </button>
          </div>
        </div>
      </motion.div>
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center text-blue-700 font-medium mb-4">
          Loading Comparison Data...
        </div>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-300 overflow-hidden">
          <div className="bg-[#0B4A8B] text-white text-center py-3 font-bold text-xl">
            PARAMETER COMPARISON CHART
          </div>

          <div className="p-6">
            <h2 className="text-center text-3xl font-bold mb-6 text-slate-900">
              {xParameter || "X Parameter"} vs {yParameter || "Y Parameter"}
            </h2>

            <ResponsiveContainer width="100%" height={600}>
              <LineChart
                data={chartData}
                margin={{
                  top: 30,
                  right: 40,
                  left: 40,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#D1D5DB" />

                <XAxis
                  tick={{ fill: "#1E293B", fontSize: 14 }}
                  type="number"
                  dataKey="x"
                  label={{
                    value: xParameter,
                    position: "bottom",
                    offset: 20,
                    fill: "#0B3D91",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                />

                <YAxis
                  label={{
                    value: yParameter,
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Legend />

                <Tooltip
                  content={
                    <CustomTooltip
                      xParameter={xParameter}
                      yParameter={yParameter}
                    />
                  }
                />

                {selectedCoords && (
                  <>
                    <ReferenceLine
                      x={selectedCoords.x}
                      stroke="red"
                      strokeDasharray="5 5"
                    />

                    <ReferenceLine
                      y={selectedCoords.y}
                      stroke="red"
                      strokeDasharray="5 5"
                    />
                  </>
                )}

                <Line
                  type="monotone"
                  dataKey="y"
                  name="Live Data"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "#2563EB",
                  }}
                  activeDot={{
                    r: 9,
                    fill: "red",
                  }}
                  onClick={(point: any) => {
                    if (point?.raw) {
                      setSelectedPoint(point.raw);

                      setSelectedCoords({
                        x: point.x,
                        y: point.y,
                      });
                    }
                  }}
                />
              </LineChart>
            </ResponsiveContainer>

            {selectedCoords && (
              <div className="mt-6 border rounded-lg bg-slate-50 p-4 text-center">
                <span className="text-slate-700">How to Read:</span>

                <span className="font-bold text-red-600 mx-1">
                  {selectedCoords.x}
                </span>

                <span>{xParameter}</span>

                <span className="mx-2">→</span>

                <span>{yParameter}</span>

                <span className="font-bold text-red-600 ml-2">
                  {selectedCoords.y}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-center text-[#0B4A8B] font-bold text-lg mb-4">
            SELECTED POINT DETAILS
          </h3>

          <div className="mt-6 space-y-3">
            <div className="border rounded-lg p-4 bg-slate-50">
              <div className="font-semibold text-[#0B4A8B]">
                Hover on any point
              </div>

              <div className="text-sm text-slate-600">to see exact values</div>
            </div>

            <div className="border rounded-lg p-4 bg-slate-50">
              <div className="font-semibold text-[#0B4A8B]">Click on chart</div>

              <div className="text-sm text-slate-600">
                to lock / compare points
              </div>
            </div>
          </div>

          <p className="text-xs text-[#64748B] mb-4">
            Click any scatter point to inspect full record.
          </p>
          <div className="mb-5 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <div className="text-xs text-[#64748B] mb-1">Records Analyzed</div>

            <div className="text-2xl font-bold text-text-primary">
              {chartData.length}
            </div>
          </div>
          <div className="mt-4 p-4 bg-accent-subtle rounded-lg border border-accent-muted">
            <div className="text-xs text-[#1E40AF] mb-1 font-medium">
              Correlation Score
            </div>

            <div className="text-2xl font-bold text-accent">
              {correlation.toFixed(2)}
            </div>

            <div className="text-xs text-[#64748B] mt-1">
              {Math.abs(correlation) > 0.8
                ? "Strong Relationship"
                : Math.abs(correlation) > 0.5
                  ? "Moderate Relationship"
                  : "Weak Relationship"}
            </div>
          </div>
          {selectedPoint && (
            <div className="mb-4 p-3 bg-danger-bg border border-[#FECACA] rounded-lg">
              <div className="text-xs text-[#B91C1C] font-medium">
                Relationship Insight
              </div>

              <div className="text-sm text-[#7F1D1D] mt-1">
                At {String(selectedPoint[xParameter])} →{" "}
                {String(selectedPoint[yParameter])}
              </div>
            </div>
          )}

          {selectedPoint ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">X Value</span>
                <span className="font-semibold">
                  {String(selectedPoint[xParameter])}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#64748B]">Y Value</span>
                <span className="font-semibold">
                  {String(selectedPoint[yParameter])}
                </span>
              </div>

              <hr />

              {Object.entries(selectedPoint)
                .slice(0, 10)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-3">
                    <span className="text-[#64748B] truncate">{key}</span>

                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-sm text-[#64748B]">
              Click any chart point to inspect data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
