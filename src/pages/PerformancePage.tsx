import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/ui/PageHeader";
import ParameterModule from "@/components/ParameterModule";

// import { useData } from "@/store/DataContext";

import { getParametersByCategory, CATEGORY_CONFIG } from "@/utils/schemaEngine";

import { hasColumnData, getColumnStats } from "@/utils/analytics";

import { getPerformanceRequest } from "@/store/performance/actions";

export default function PerformancePage() {
  const dispatch = useDispatch();

  const performanceCharts = useSelector(
    (state: any) => state.performance?.charts
  );

  useEffect(() => {
    console.log("PERFORMANCE CHARTS", performanceCharts);
  }, [performanceCharts]);

  useEffect(() => {
    dispatch(
      getPerformanceRequest({
        parameterName: "BugSpeed",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );

    dispatch(
      getPerformanceRequest({
        parameterName: "BugTorque",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );
  }, [dispatch]);

  // const { data } = useData();

  // if (!data) return null;

  // const { records, schema } = data;

  //  const performanceParams = useMemo(
  //   () =>
  //     getParametersByCategory(
  //       schema,
  //       "performance"
  //     ).filter((p) =>
  //       hasColumnData(records, p.originalName)
  //     ),
  //   [schema, records]
  // );

  // const bugSpeedParams = useMemo(
  //   () =>
  //     performanceParams.filter(
  //       (p) => p.normalizedKey === "speed"
  //     ),
  //   [performanceParams]
  // );

  // const bugTorqueParams = useMemo(
  //   () =>
  //     performanceParams.filter(
  //       (p) => p.normalizedKey === "torque"
  //     ),
  //   [performanceParams]
  // );

  const bugSpeedParams = [
    {
      originalName: "BUG Speed",
      normalizedKey: "speed",
    },
  ];

  const bugTorqueParams = [
    {
      originalName: "BUG Torque",
      normalizedKey: "torque",
    },
  ];

  // const allParams = [
  //   ...bugSpeedParams,
  //   ...bugTorqueParams,
  // ];
  // const insight = useMemo(() => {
  //   const parts = [];

  //   if (bugSpeedParams.length > 0) {
  //     const avgSpeed =
  //       bugSpeedParams.reduce(
  //         (sum, p) =>
  //           sum +
  //           getColumnStats(
  //             records,
  //             p.originalName
  //           ).avg,
  //         0
  //       ) / bugSpeedParams.length;

  //     parts.push(
  //       `Average bug speed across monitored records is ${avgSpeed.toFixed(
  //         2
  //       )}.`
  //     );
  //   }

  //   if (bugTorqueParams.length > 0) {
  //     const avgTorque =
  //       bugTorqueParams.reduce(
  //         (sum, p) =>
  //           sum +
  //           getColumnStats(
  //             records,
  //             p.originalName
  //           ).avg,
  //         0
  //       ) / bugTorqueParams.length;

  //     parts.push(
  //       `Average bug torque across monitored records is ${avgTorque.toFixed(
  //         2
  //       )}.`
  //     );
  //   }

  //   return (
  //     parts.join(" ") ||
  //     "Upload performance-related data to view analytics."
  //   );
  // }, [
  //   records,
  //   bugSpeedParams,
  //   bugTorqueParams,
  // ]);

  const insight =
    "Performance analytics loaded dynamically from backend APIs for Bug Speed and Bug Torque.";
  // const hasData = allParams.length > 0;
  const hasData =
    !!performanceCharts?.BugSpeed?.length ||
    !!performanceCharts?.BugTorque?.length;

  return (
    <div>
      <PageHeader
        title="Performance Analytics"
        description="Performance analysis of Bug Speed and Bug Torque parameters across all available test records."
        insight={insight}
      />

      {/* Bug Speed */}
      {bugSpeedParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Bug Speed Analysis
          </h2>

          <p className="text-[13px] text-[#64748B] mb-6">
            Trend analysis and monitoring of bug speed measurements.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bugSpeedParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={performanceCharts?.BugSpeed || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.performance?.color || "#3B82F6"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Bug Torque */}
      {bugTorqueParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Bug Torque Analysis
          </h2>

          <p className="text-[13px] text-[#64748B] mb-6">
            Trend analysis and monitoring of bug torque measurements.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bugTorqueParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={performanceCharts?.BugTorque || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.performance.color || "#10B981"}
              />
            ))}
          </div>
        </section>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <p className="text-[15px] text-[#64748B]">
            No performance parameters found in the uploaded dataset. Ensure your
            file contains Bug Speed and Bug Torque columns.
          </p>
        </div>
      )}
    </div>
  );
}
