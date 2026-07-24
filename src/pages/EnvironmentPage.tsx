import { useMemo, useEffect } from "react";

import PageHeader from "@/components/ui/PageHeader";
import ParameterModule from "@/components/ParameterModule";
import KPICard from "@/components/ui/KPICard";
import { formatNumber } from "@/utils/analytics";
import { CATEGORY_CONFIG, getParametersByCategory } from "@/utils/schemaEngine";
import { Thermometer, Droplets, Gauge } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAmbientRequest } from "@/store/ambient/actions";

export default function EnvironmentPage() {
  const dispatch = useDispatch();

  const ambientCharts = useSelector((state: any) => state.ambient?.charts);
  useEffect(() => {
    dispatch(
      getAmbientRequest({
        ambientName: "Ambient_temperature", // cpnstarint.js
        filters: {
          fromDate: "04-06-2026", // hard codee
        },
      })
    );

    dispatch(
      getAmbientRequest({
        ambientName: "Ambient_humidity", // should take from constarints .js
        filters: {
          fromDate: "04-06-2026", // hardcodes
        },
      })
    );

    dispatch(
      getAmbientRequest({
        ambientName: "Ambient_pressure", // shpuld take form constarint.js

        filters: {
          fromDate: "04-06-2026",
        },
      })
    );
  }, [dispatch]);

  const envParams = [
    {
      originalName: "Ambient temperature",
      normalizedKey: "ambient_temperature",
      unit: "°C",
    },
    {
      originalName: "Ambient humidity",
      normalizedKey: "ambient_humidity",
      unit: "%",
    },
    {
      originalName: "Ambient pressure",
      normalizedKey: "ambient_pressure",
      unit: "hPa",
    },
  ];
  const tempParam = envParams[0];
  const humidityParam = envParams[1];
  const pressureParam = envParams[2];
  const calculateAverage = (records: any[], fieldName: string) => {
    if (!records?.length) return 0;

    const values = records
      .map((item) => Number(item[fieldName]))
      .filter((value) => !isNaN(value));

    if (!values.length) return 0;

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };
  const tempStats = {
    avg: calculateAverage(
      ambientCharts?.Ambient_temperature || [],
      "Ambient_temperature"
    ),
  };

  const humidityStats = {
    avg: calculateAverage(
      ambientCharts?.Ambient_humidity || [],
      "Ambient_humidity"
    ),
  };

  const pressureStats = {
    avg: calculateAverage(
      ambientCharts?.Ambient_pressure || [],
      "Ambient_pressure"
    ),
  };

  const insight = useMemo(() => {
    const parts = [];

    if (tempStats?.avg > 0) {
      parts.push(
        `Average ambient temperature is ${tempStats.avg.toFixed(2)}°C.`
      );
    }

    if (humidityStats?.avg > 0) {
      parts.push(
        `Average relative humidity is ${humidityStats.avg.toFixed(2)}%.`
      );
    }

    if (pressureStats?.avg > 0) {
      parts.push(
        `Average atmospheric pressure is ${pressureStats.avg.toFixed(2)} hPa.`
      );
    }

    if (humidityStats?.avg > 70) {
      parts.push(
        "High humidity conditions detected. Moisture ingress monitoring is recommended."
      );
    }

    return (
      parts.join(" ") ||
      "Upload environmental data to view ambient condition insights."
    );
  }, [tempStats?.avg, humidityStats?.avg, pressureStats?.avg]);
  const hasData = Object.keys(ambientCharts || {}).length > 0;

  return (
    <div>
      <PageHeader
        title="Environment Analytics"
        description="Ambient condition monitoring and impact analysis on generator performance. Environmental factors directly affect air density, cooling efficiency, and combustion quality."
        insight={insight}
      />

      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {tempStats && tempParam && (
            <KPICard
              label={tempParam.originalName}
              value={formatNumber(tempStats.avg)}
              unit="°C"
              icon={Thermometer}
              color="#DC2626" // check the css   ( no inline css)
              delay={0.1}
            />
          )}
          {humidityStats && humidityParam && (
            <KPICard
              label={humidityParam.originalName}
              value={formatNumber(humidityStats.avg)}
              unit="%"
              icon={Droplets}
              color="#0891B2"
              delay={0.15}
            />
          )}
          {pressureStats && pressureParam && (
            <KPICard
              label={pressureParam.originalName}
              value={formatNumber(pressureStats.avg)}
              unit="hPa"
              icon={Gauge}
              color="#7C3AED"
              delay={0.2}
            />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {envParams.map((param, i) => {
          const ambientKey = param.normalizedKey.replace(
            "ambient_",
            "Ambient_"
          );
          return (
            <ParameterModule
              key={param.originalName}
              columnSchema={param as any}
              records={ambientCharts?.[ambientKey] || []}
              delay={0.15 + i * 0.05}
              chartType="area"
              color={CATEGORY_CONFIG.environmental.color}
            />
          );
        })}
      </div>

      {!hasData && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <Thermometer size={32} className="text-text-tertiary mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">
            No environmental data found. Ensure your file contains ambient
            temperature, humidity, or pressure columns.
          </p>
        </div>
      )}
    </div>
  );
}
