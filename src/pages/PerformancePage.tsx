import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/components/ui/PageHeader";
import ParameterModule from "@/components/ParameterModule";
import { getParametersByCategory, CATEGORY_CONFIG } from "@/utils/schemaEngine";
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

  const bugSpeedParams = [
    {
      originalName: "BUG Speed",
      normalizedKey: "speed",
      unit: "RPM",
    },
  ];

  const bugTorqueParams = [
    {
      originalName: "BUG Torque",
      normalizedKey: "torque",
      unit: "Nm",
    },
  ];
  const calculateAverage = (records: any[], fieldName: string) => {
    if (!records?.length) return 0;

    const values = records
      .map((item) => Number(item[fieldName]))
      .filter((value) => !isNaN(value));

    if (!values.length) return 0;

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

const avgSpeed = calculateAverage(
  performanceCharts?.BugSpeed || [],
  "BUG_Speed"
);

const avgTorque = calculateAverage(
  performanceCharts?.BugTorque || [],
  "BUG_Torque"
);

  const insight = useMemo(() => {
    const parts = [];

    if (avgSpeed > 0) {
      parts.push(`Average BUG speed is ${avgSpeed.toFixed(2)} RPM.`);
    }

    if (avgTorque > 0) {
      parts.push(`Average BUG torque is ${avgTorque.toFixed(2)} Nm.`);
    }

    return parts.join(" ") || "No performance data available.";
  }, [avgSpeed, avgTorque]);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {bugSpeedParams.length > 0 && (
          <ParameterModule
            columnSchema={bugSpeedParams[0] as any}
            records={performanceCharts?.BugSpeed || []}
            delay={0.1}
            chartType="line"
            color={CATEGORY_CONFIG.performance?.color || "#3B82F6"}
          />
        )}

        {bugTorqueParams.length > 0 && (
          <ParameterModule
            columnSchema={bugTorqueParams[0] as any}
            records={performanceCharts?.BugTorque || []}
            delay={0.15}
            chartType="line"
            color={CATEGORY_CONFIG.performance?.color || "#10B981"}
          />
        )}
      </div>

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
