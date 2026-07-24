// import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import KPICard from "@/components/ui/KPICard";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestAnalyticsRequest } from "@/store/testAnalytics/actions";
//import { useData } from '@/store/DataContext';
//import { getTextDistribution, getPassPercentage } from '@/utils/analytics';
import {
  FlaskConical,
  Users,
  CheckCircle2,
  XCircle,
  Settings,
  Clock,
  Hash,
  Activity,
} from "lucide-react";

const COLORS = [
  "#2563EB",
  "#059669",
  "#D97706",
  "#DC2626",
  "#7C3AED",
  "#0891B2",
  "#4F46E5",
  "#0D9488",
  "#B45309",
  "#9333EA",
];

function AnimatedDistChart({
  title,
  desc,
  data,
  delay,
  colorIndex = 0,
}: {
  title: string;
  desc: string;
  data: { name: string; value: number }[];
  delay: number;
  colorIndex?: number;
}) {
  if (data.length === 0) return null;
  const isPie = data.length <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-xl border border-border p-6 transition-shadow duration-300"
    >
      <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">{title}</h3>
      <p className="text-[13px] text-[#64748B] mb-5 leading-relaxed">{desc}</p>
      <ResponsiveContainer width="100%" height={260}>
        {isPie ? (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[(i + colorIndex) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E9F0",
                borderRadius: "12px",
                fontSize: "13px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                padding: "10px 14px",
              }}
            />
          </PieChart>
        ) : (
          <ReBarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F1F5F9"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748B" }}
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              angle={-20}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748B" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E9F0",
                borderRadius: "12px",
                fontSize: "13px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="value"
              fill={COLORS[colorIndex % COLORS.length]}
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
              name="Count"
              animationDuration={600}
            />
          </ReBarChart>
        )}
      </ResponsiveContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#F1F5F9]"
      >
        {data.slice(0, 8).map((d, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-[12px]"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: COLORS[(i + colorIndex) % COLORS.length],
              }}
            />
            <span className="text-[#475569] font-medium">{d.name}</span>
            <span className="text-text-tertiary tabular-nums font-semibold">
              {d.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function TestsPage() {
  // const { data } = useData();
  // if (!data) return null;

  // const { records, schema } = data;

  const dispatch = useDispatch();

  const { dashboard, loading, error } = useSelector(
    (state: any) => state.testAnalytics
  );

  useEffect(() => {
    dispatch(getTestAnalyticsRequest({}));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboard) return null;

  const summary = dashboard.summary || {};

  const metadata = dashboard.metadata || {};

  const statusData = dashboard.statusDistribution || [];

  const operatorData = dashboard.operatorActivity || [];

  const conditionData = dashboard.testConditions || [];

  const modeData = dashboard.operatingModes || [];

  const operatorPassRates = (dashboard.operatorPerformance || []).map(
    (item: any) => ({
      name: item.name,
      "Pass Rate": item.passRate,
      Tests: item.tests,
    })
  );

  const conditionPassRates = (dashboard.conditionPerformance || []).map(
    (item: any) => ({
      name: item.name,
      "Pass Rate": item.passRate,
      Tests: item.tests,
    })
  );

  const totalTests = summary.totalTests || 0;

  const passRate = summary.passRate || 0;

  const uniqueOperators = summary.operators || 0;

  const uniqueConditions = summary.conditions || 0;

  const uniqueModes = summary.operatingModes || 0;

  const uniqueUuts = summary.uutUnits || 0;

  const timestampRange =
    metadata?.startTime && metadata?.endTime
      ? {
          start: metadata.startTime,
          end: metadata.endTime,
        }
      : null;

  const insight = [
    `${totalTests} test records analyzed.`,
    passRate > 0 ? `Overall pass rate: ${passRate}%.` : "",
    uniqueOperators > 0 ? `${uniqueOperators} operators conducted tests.` : "",
    uniqueConditions > 0 ? `${uniqueConditions} distinct test conditions.` : "",
    uniqueModes > 0 ? `${uniqueModes} operating modes.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <PageHeader
        title="Test Analytics"
        description="Comprehensive analysis of test conditions, operating modes, operator performance, and status distribution across all recorded generator tests."
        insight={insight}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <KPICard
          label="Total Tests"
          value={totalTests.toLocaleString()}
          icon={FlaskConical}
          color="#2563EB"
          delay={0.1}
        />
        <KPICard
          label="Pass Rate"
          value={`${passRate}`}
          unit="%"
          icon={CheckCircle2}
          color="#059669"
          delay={0.12}
        />
        <KPICard
          label="Fail Rate"
          value={(100 - passRate).toFixed(2)}
          unit="%"
          icon={XCircle}
          color="#DC2626"
          delay={0.14}
        />
        <KPICard
          label="Operators"
          value={uniqueOperators > 0 ? uniqueOperators.toString() : "—"}
          icon={Users}
          color="#7C3AED"
          delay={0.16}
        />
        <KPICard
          label="Conditions"
          value={uniqueConditions > 0 ? uniqueConditions.toString() : "—"}
          icon={Settings}
          color="#D97706"
          delay={0.18}
        />
        <KPICard
          label="UUT Units"
          value={uniqueUuts > 0 ? uniqueUuts.toString() : "—"}
          icon={Hash}
          color="#0891B2"
          delay={0.2}
        />
      </div>

      {/* Metadata Section */}
      {(metadata || uniqueUuts > 0) && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Dataset Metadata
          </h2>
          <p className="text-[13px] text-[#64748B] mb-4">
            Information about the test dataset coverage and identifiers.
          </p>
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {timestampRange && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-[#64748B]" />
                    <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                      Time Range
                    </span>
                  </div>
                  <div className="text-[13px] text-[#0F172A] font-medium">
                    {timestampRange.start}
                  </div>
                  <div className="text-[12px] text-[#64748B]">
                    to {timestampRange.end}
                  </div>
                </div>
              )}
              {uniqueUuts > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hash size={14} className="text-[#64748B]" />
                    <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                      UUT IDs
                    </span>
                  </div>
                  <div className="text-[13px] text-[#0F172A] font-medium">
                    {uniqueUuts} unique units
                  </div>
                  <div className="text-[12px] text-[#64748B]">
                    {uniqueUuts} Unique UUT IDs
                  </div>
                </div>
              )}
              {metadata?.testSessions && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={14} className="text-[#64748B]" />
                    <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                      Test Sessions
                    </span>
                  </div>
                  <div className="text-[13px] text-[#0F172A] font-medium">
                    {metadata.testSessions} records
                  </div>
                  <div className="text-[12px] text-[#64748B]">
                    Total Test Sessions
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical size={14} className="text-[#64748B]" />
                  <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Data Points
                  </span>
                </div>
                <div className="text-[13px] text-[#0F172A] font-medium">
                  {metadata.dataPoints?.toLocaleString()}
                </div>
                <div className="text-[12px] text-[#64748B]">
                  Backend Calculated Data Points
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {statusData.length > 0 && (
          <AnimatedDistChart
            title="Test Status Distribution"
            desc="Breakdown of test outcomes showing pass, fail, terminated, and other status categories."
            data={statusData}
            delay={0.2}
            colorIndex={0}
          />
        )}

        {operatorData.length > 0 && (
          <AnimatedDistChart
            title="Operator Activity"
            desc="Test count distribution by operator showing workload and testing coverage."
            data={operatorData}
            delay={0.25}
            colorIndex={3}
          />
        )}

        {conditionData.length > 0 && (
          <AnimatedDistChart
            title="Test Conditions"
            desc="Distribution of test conditions (e.g., ENVIRONMENTAL, PRELIMINARY, FUNCTIONAL)."
            data={conditionData}
            delay={0.3}
            colorIndex={1}
          />
        )}

        {modeData.length > 0 && (
          <AnimatedDistChart
            title="Operating Modes"
            desc="Distribution of generator operating modes (e.g., ESS_TEST, PM_TEST, FUNC_TEST)."
            data={modeData}
            delay={0.35}
            colorIndex={4}
          />
        )}
      </div>

      {/* Operator Performance */}
      {operatorPassRates.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Operator Performance Analysis
          </h2>
          <p className="text-[13px] text-[#64748B] mb-4">
            Pass rate comparison across different operators.
          </p>
          <div className="bg-white rounded-xl border border-border p-6">
            <ResponsiveContainer width="100%" height={280}>
              <ReBarChart
                data={operatorPassRates}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  label={{
                    value: "Pass Rate %",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12, fill: "#64748B" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E9F0",
                    borderRadius: "12px",
                    fontSize: "13px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="Pass Rate"
                  fill="#059669"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                  animationDuration={600}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      )}

      {/* Condition Performance */}
      {conditionPassRates.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Test Condition Performance
          </h2>
          <p className="text-[13px] text-[#64748B] mb-4">
            Success rate analysis by test condition type.
          </p>
          <div className="bg-white rounded-xl border border-border p-6">
            <ResponsiveContainer width="100%" height={240}>
              <ReBarChart
                data={conditionPassRates}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E9F0",
                    borderRadius: "12px",
                    fontSize: "13px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="Pass Rate"
                  fill="#2563EB"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                  animationDuration={600}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-border p-6"
      >
        <h3 className="text-[15px] font-semibold text-[#0F172A] mb-2">
          Test Program Summary
        </h3>
        <p className="text-[13px] text-[#64748B] leading-relaxed">
          The test program encompasses{" "}
          <strong>{totalTests.toLocaleString()}</strong> recorded test sessions
          {uniqueOperators > 0
            ? ` conducted by <strong>${uniqueOperators}</strong> operators`
            : ""}
          {uniqueConditions > 0
            ? ` across <strong>${uniqueConditions}</strong> different test conditions`
            : ""}
          {uniqueModes > 0
            ? ` in <strong>${uniqueModes}</strong> operating modes`
            : ""}
          .
          {passRate > 90
            ? " The high pass rate indicates excellent generator performance across test scenarios."
            : passRate > 70
              ? " The pass rate is acceptable with opportunities to improve reliability."
              : passRate > 0
                ? " The pass rate requires attention — root cause analysis of failures is recommended."
                : ""}
        </p>
      </motion.div>
    </div>
  );
}
