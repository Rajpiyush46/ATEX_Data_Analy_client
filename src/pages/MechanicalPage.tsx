
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import KPICard from '@/components/ui/KPICard';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
getMechanicalDashboardRequest,
} from "@/store/mechanical/actions";
import { Activity, AlertTriangle, BarChart3, TrendingUp } from 'lucide-react';

export default function MechanicalPage() {
  const dispatch = useDispatch();

  const {
    dashboard,
    loading,
    error,
  } = useSelector(
    (state: any) => state.mechanical
  );

  useEffect(() => {
    dispatch(
      getMechanicalDashboardRequest({})
    );
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboard) {
    return null;
  }

  const summary = dashboard.summary || {};

  const averageVibration =
    summary.averageVibration || 0;

  const peakVibration =
    summary.peakVibration || 0;

  const anomalies =
    summary.anomalies || 0;

  const stdDeviation =
    summary.stdDeviation || 0;

  const trendData =
    dashboard.trendData || [];

  const peakData =
    dashboard.peakData || [];

  const distData =
    (dashboard.distributionData || []).map(
      (item: any) => ({
        range: item.range,
        Count: item.count,
      })
    );

  const insight =
    dashboard.insight?.message || "";

  const hasData =
    trendData.length > 0;

  return (
    <div>
      <PageHeader
        title="Mechanical Analytics"
        description="Vibration analysis for mechanical health monitoring, including trend analysis, peak detection, distribution profiling, and anomaly highlighting."
        insight={insight}
      />

      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard label="Avg Vibration" value={averageVibration.toFixed(2)} unit="mm/s" icon={Activity} color="#2563EB" delay={0.1} />
          <KPICard label="Peak Vibration" value={peakVibration.toFixed(2)} unit="mm/s" icon={TrendingUp} color="#DC2626" delay={0.15} />
          <KPICard label="Anomalies" value={anomalies.toString()} unit="readings" icon={AlertTriangle} color={anomalies > 0 ? '#D97706' : '#059669'} delay={0.2} />
          <KPICard label="Std Deviation" value={stdDeviation.toFixed(2)} unit="mm/s" icon={BarChart3} color="#7C3AED" delay={0.25} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsChart
          title="Vibration Trend"
          description="Vibration readings over time."
          data={trendData}
          dataKey="value"
          xKey="time"
          xLabel="Time"
          yLabel="mm/s"
          type="area"
          color="#2563EB"
          unit="mm/s"
          delay={0.15}
        />
        {peakData.length > 0 && (
          <AnalyticsChart
          title="Vibration Peaks"
          description="Identified vibration peaks exceeding 0.5 standard deviations above mean. Peak frequency and magnitude help diagnose bearing wear."
          data={peakData}
          dataKey="value"
          xKey="sample"
          xLabel="Sample"
          yLabel="mm/s"
          type="bar"
          color="#DC2626"
          unit="mm/s"
          delay={0.2}
        />
        )}

        {distData.length > 0 && (
          <AnalyticsChart
            title="Vibration Distribution"
            description="Histogram of vibration values showing the probability distribution. A narrow, symmetric distribution indicates stable operation."
            data={distData}
            dataKey="Count"
            xKey="range"
            xLabel="Vibration (mm/s)"
            yLabel="Frequency"
            type="bar"
            color="#7C3AED"
            delay={0.25}
          />
        )}
      </div>

      {/* Anomaly Alert */}
      {anomalies > 0  && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-[#FFFBEB] rounded-xl border border-[#FDE68A] p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-[#D97706]" />
            <h3 className="text-[15px] font-semibold text-[#92400E]">Anomaly Alert</h3>
          </div>
          <p className="text-[13px] text-[#78350F] leading-relaxed">
            {anomalies} vibration readings exceeded the 2-sigma threshold ({(averageVibration + 2 * stdDeviation).toFixed(2)} mm/s).
            This represents {((anomalies / trendData.length) * 100).toFixed(1)}% of all measurements.
            Recommended actions: inspect bearing surfaces, verify shaft alignment, and check for loose mounting bolts.
          </p>
        </motion.div>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <Activity size={32} className="text-text-tertiary mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">No vibration data found. Ensure your file contains vibration measurement columns.</p>
        </div>
      )}
    </div>
  );
}
