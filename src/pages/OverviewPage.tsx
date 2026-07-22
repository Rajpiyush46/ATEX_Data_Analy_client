import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, TrendingUp, BarChart3 } from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PageHeader from "@/components/ui/PageHeader";
import KPICard from "@/components/ui/KPICard";
import AnalyticsChart from "@/components/ui/AnalyticsChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOverviewRequest } from "@/store/overview/actions";

export default function OverviewPage() {
  const dispatch = useDispatch();
  const {
    loading,
    data: overviewData,
    error,
  } = useSelector((state: any) => state.overview);
  console.log("overviewData", overviewData);
  console.log("error", error);
  useEffect(() => {
    dispatch(getOverviewRequest({}));
  }, [dispatch]);

  const healthScore = overviewData?.healthScore || 0;
  // const passPercent = overviewData?.passPercent || 0;
  const statusChartData = overviewData?.statusDistribution || [];
  const STATUS_COLORS = [
    "#2563EB",
    "#059669",
    "#D97706",
    "#DC2626",
    "#7C3AED",
    "#0891B2",
  ];

  const kpis = overviewData?.kpis || [];

  const insight = overviewData?.insight || "";
  if (loading) {
    return <div>Loading Overview...</div>;
  }

  if (!overviewData) {
    return <div>No Data Available</div>;
  }
  if (error) {
  return (
    <div style={{ padding: "20px" }}>
      {JSON.stringify(error)}
    </div>
  );
}

  return (
    <div>
      <PageHeader
        title="Generator Overview"
        description="Executive summary of generator performance, health metrics, and operational status across all recorded test data."
        insight={insight}
      />

      {/* Health Score Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8 bg-white rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-accent to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-200/30">
              <Heart size={28} className="text-white" />
            </div>

            <div>
              <div className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider mb-0.5">
                Generator Health Score
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0F172A] tabular-nums">
                  {healthScore}
                </span>

                <span className="text-lg text-text-tertiary font-medium">
                  / 100
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 ml-4">
            <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${healthScore}%`,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    healthScore >= 85
                      ? "#059669"
                      : healthScore >= 70
                        ? "#D97706"
                        : "#DC2626",
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-[11px] text-text-tertiary font-medium">
              <span>Critical</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 pl-6 border-l border-[#F1F5F9]">
            <div className="text-[12px] text-text-tertiary font-medium">
              Records Analyzed
            </div>

            <div className="text-2xl font-bold text-[#0F172A] tabular-nums">
              {overviewData?.totalRecords?.toLocaleString()}
            </div>

            <div className="flex items-center gap-1 text-[12px] text-[#059669] font-medium">
              <TrendingUp size={12} />
              {overviewData?.parameterCount} parameters detected
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      {kpis.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi: any, i: number) => (
            <KPICard
              key={i}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              icon={BarChart3}
              color="#2563EB"
              delay={0.15 + i * 0.04}
            />
          ))}
        </div>
      )}

      {/* Charts + Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {overviewData?.chartCards?.map((chart: any, i: number) => (
          <AnalyticsChart
            key={i}
            title={chart.title}
            description={chart.description}
            data={chart.data}
            dataKey={chart.dataKey}
            xLabel="Sample"
            yLabel={chart.unit}
            type="area"
            color={chart.color}
            min={chart.min}
            max={chart.max}
            avg={chart.avg}
            variance={chart.variance}
            unit={chart.unit}
            delay={0.2 + i * 0.05}
          />
        ))}

        {statusChartData.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.35,
            }}
            className="bg-white rounded-xl border border-border p-6"
          >
            <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">
              Status Distribution
            </h3>

            <p className="text-[13px] text-[#64748B] mb-4">
              Breakdown of test outcomes across all records.
            </p>

            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusChartData.map((_entry: any, i: number) => (
                    <Cell
                      key={i}
                      fill={STATUS_COLORS[i % STATUS_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E9F0",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-4 mt-2">
              {statusChartData.map((entry: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-[12px]">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: STATUS_COLORS[i % STATUS_COLORS.length],
                    }}
                  />

                  <span className="text-[#475569] font-medium">
                    {entry.name}
                  </span>

                  <span className="text-text-tertiary tabular-nums">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
