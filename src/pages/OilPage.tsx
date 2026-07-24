import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import ParameterModule from "@/components/ParameterModule";
import { Gauge, Thermometer, Droplets, ArrowDownUp } from "lucide-react";
import { getParametersByCategory, CATEGORY_CONFIG } from "@/utils/schemaEngine";
import { getOilRequest } from "@/store/oil/actions.tsx";

export default function OilPage() {
  const dispatch = useDispatch();

  const oilCharts = useSelector((state: any) => state.oil?.charts);

  useEffect(() => {
    dispatch(
      getOilRequest({
        parameterName: "BugOilPressure",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );

    dispatch(
      getOilRequest({
        parameterName: "BugOilOutPressure",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );

    dispatch(
      getOilRequest({
        parameterName: "BugOilTemperature",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );

    dispatch(
      getOilRequest({
        parameterName: "BugOilOutTemperature",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );

    dispatch(
      getOilRequest({
        parameterName: "BugOilOutFlow",
        filters: {
          fromDate: "04-06-2026",
        },
      })
    );
  }, [dispatch]);

  const calculateAverage = (records: any[], fieldName: string) => {
    if (!records?.length) return 0;

    const values = records
      .map((item) => Number(item[fieldName]))
      .filter((value) => !isNaN(value));

    if (!values.length) return 0;

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const oilParams = [
    {
      originalName: "BugOilPressure",
      normalizedKey: "oil_in_pressure",
      unit: "bar",
    },
    {
      originalName: "BugOilOutPressure",
      normalizedKey: "oil_out_pressure",
      unit: "bar",
    },
    {
      originalName: "BugOilTemperature",
      normalizedKey: "oil_in_temperature",
      unit: "°C",
    },
    {
      originalName: "BugOilOutTemperature",
      normalizedKey: "oil_out_temperature",
      unit: "°C",
    },
    {
      originalName: "BugOilOutFlow",
      normalizedKey: "oil_flow",
      unit: "L/min",
    },
  ];
  console.log(
    "OIL PARAMS",
    oilParams.map((p) => ({
      originalName: p.originalName,
      normalizedKey: p.normalizedKey,
    }))
  );

  const oilInPressureParams = useMemo(
    () => oilParams.filter((p) => p.normalizedKey === "oil_in_pressure"),
    [oilParams]
  );

  const oilOutPressureParams = useMemo(
    () => oilParams.filter((p) => p.normalizedKey === "oil_out_pressure"),
    [oilParams]
  );

  const oilInTemperatureParams = useMemo(
    () => oilParams.filter((p) => p.normalizedKey === "oil_in_temperature"),
    [oilParams]
  );

  const oilOutTemperatureParams = useMemo(
    () => oilParams.filter((p) => p.normalizedKey === "oil_out_temperature"),
    [oilParams]
  );

  const oilOutFlowParams = useMemo(
    () => oilParams.filter((p) => p.normalizedKey === "oil_flow"),
    [oilParams]
  );

  const hasData = Object.keys(oilCharts || {}).length > 0;

  const oilInPressureAvg = calculateAverage(
    oilCharts?.BugOilPressure || [],
    "BugOilPressure"
  );

  const oilOutPressureAvg = calculateAverage(
    oilCharts?.BugOilOutPressure || [],
    "BugOilOutPressure"
  );

  const oilInTemperatureAvg = calculateAverage(
    oilCharts?.BugOilTemperature || [],
    "BugOilTemperature"
  );

  const oilOutTemperatureAvg = calculateAverage(
    oilCharts?.BugOilOutTemperature || [],
    "BugOilOutTemperature"
  );

  const oilOutFlowAvg = calculateAverage(
    oilCharts?.BugOilOutFlow || [],
    "BugOilOutFlow"
  );

  const pressureDrop = oilInPressureAvg - oilOutPressureAvg;
  const insight = useMemo(() => {
    const tempRise = oilOutTemperatureAvg - oilInTemperatureAvg;

    const parts = [];

    if (pressureDrop > 0) {
      parts.push(
        `Average pressure differential: ${pressureDrop.toFixed(2)} PSI.`
      );
    }

    if (oilInTemperatureAvg > 0 && oilOutTemperatureAvg > 0) {
      parts.push(
        `Average temperature rise: ${tempRise.toFixed(2)}°C across engine.`
      );
    }

    if (oilOutFlowAvg > 0) {
      parts.push(`Average oil outlet flow: ${oilOutFlowAvg.toFixed(2)} L/min.`);
    }

    return (
      parts.join(" ") ||
      "Upload oil system data to view lubrication system insights."
    );
  }, [pressureDrop, oilInTemperatureAvg, oilOutTemperatureAvg, oilOutFlowAvg]);

  return (
    <div>
      <PageHeader
        title="Oil System Analytics"
        description="Analysis of oil pressure, temperature and flow behaviour across all available test records."
        insight={insight}
      />
      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <KPICard
            label="BUG OIL IN PRESSURE"
            value={oilInPressureAvg.toFixed(2)}
            unit="PSI"
            icon={Gauge}
            color="#DC2626"
            delay={0.1}
          />

          <KPICard
            label="BUG OIL OUT PRESSURE"
            value={oilOutPressureAvg.toFixed(2)}
            unit="PSI"
            icon={Gauge}
            color="#DC2626"
            delay={0.15}
          />

          <KPICard
            label="BUG OIL IN TEMPERATURE"
            value={oilInTemperatureAvg.toFixed(2)}
            unit="°C"
            icon={Thermometer}
            color="#EF4444"
            delay={0.2}
          />

          <KPICard
            label="BUG OIL OUT TEMPERATURE"
            value={oilOutTemperatureAvg.toFixed(2)}
            unit="°C"
            icon={Thermometer}
            color="#EF4444"
            delay={0.25}
          />

          <KPICard
            label="PRESSURE DROP"
            value={pressureDrop.toFixed(2)}
            unit="PSI"
            icon={ArrowDownUp}
            color="#0891B2"
            delay={0.3}
          />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {oilInPressureParams.length > 0 && (
          <ParameterModule
            columnSchema={oilInPressureParams[0] as any}
            records={oilCharts?.BugOilPressure || []}
            delay={0.1}
            chartType="line"
            color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
          />
        )}

        {oilOutPressureParams.length > 0 && (
          <ParameterModule
            columnSchema={oilOutPressureParams[0] as any}
            records={oilCharts?.BugOilOutPressure || []}
            delay={0.15}
            chartType="line"
            color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
          />
        )}

        {oilInTemperatureParams.length > 0 && (
          <ParameterModule
            columnSchema={oilInTemperatureParams[0] as any}
            records={oilCharts?.BugOilTemperature || []}
            delay={0.2}
            chartType="line"
            color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
          />
        )}

        {oilOutTemperatureParams.length > 0 && (
          <ParameterModule
            columnSchema={oilOutTemperatureParams[0] as any}
            records={oilCharts?.BugOilOutTemperature || []}
            delay={0.25}
            chartType="line"
            color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
          />
        )}

        {oilOutFlowParams.length > 0 && (
          <ParameterModule
            columnSchema={oilOutFlowParams[0] as any}
            records={oilCharts?.BugOilOutFlow || []}
            delay={0.3}
            chartType="line"
            color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
          />
        )}
      </div>

      {!hasData && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <p className="text-[15px] text-[#64748B]">
            No oil system parameters found in the uploaded dataset.
          </p>
        </div>
      )}
    </div>
  );
}
