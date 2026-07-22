import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/ui/PageHeader";
import ParameterModule from "@/components/ParameterModule";

// import { useData } from "@/store/DataContext";

import { getParametersByCategory, CATEGORY_CONFIG } from "@/utils/schemaEngine";

// import {
//   hasColumnData,
//   getColumnStats,
// } from "@/utils/analytics";

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

  // const { data } = useData();

  // if (!data) return null;

  // const { records, schema } = data;

  // const oilParams = useMemo(
  //   () =>
  //     getParametersByCategory(
  //       schema,
  //       "oil_system"
  //     ).filter((p) =>
  //       hasColumnData(records, p.originalName)
  //     ),
  //   [schema, records]
  // );
  const oilParams = [
    {
      originalName: "BUG Oil in Pressure",
      normalizedKey: "oil_in_pressure",
      unit: "bar",
    },
    {
      originalName: "BUG Oil Out Pressure",
      normalizedKey: "oil_out_pressure",
      unit: "bar",
    },
    {
      originalName: "BUG Oil in Temperature",
      normalizedKey: "oil_in_temperature",
      unit: "°C",
    },
    {
      originalName: "BUG Oil Out Temperature",
      normalizedKey: "oil_out_temperature",
      unit: "°C",
    },
    {
      originalName: "BUG Oil Out Flow",
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

  const allParams = [
    ...oilInPressureParams,
    ...oilOutPressureParams,
    ...oilInTemperatureParams,
    ...oilOutTemperatureParams,
    ...oilOutFlowParams,
  ];

  //   const insight = useMemo(() => {
  //     const parts = [];

  //     if (oilInPressureParams.length > 0) {
  //       const avgPressure =
  //         oilInPressureParams.reduce(
  //           (sum, p) =>
  //             sum +
  //             getColumnStats(
  //               records,
  //               p.originalName
  //             ).avg,
  //           0
  //         ) / oilInPressureParams.length;

  //       parts.push(
  //         `Average oil inlet pressure is ${avgPressure.toFixed(
  //           2
  //         )}.`
  //       );
  //     }

  //     if (oilOutFlowParams.length > 0) {
  //       const avgFlow =
  //         oilOutFlowParams.reduce(
  //           (sum, p) =>
  //             sum +
  //             getColumnStats(
  //               records,
  //               p.originalName
  //             ).avg,
  //           0
  //         ) / oilOutFlowParams.length;

  //       parts.push(
  //         `Average oil outlet flow is ${avgFlow.toFixed(
  //           2
  //         )}.`
  //       );
  //     }

  //     return (
  //       parts.join(" ") ||
  //       "Upload oil-system related data to view analytics."
  //     );
  //   }, [
  //     records,
  //     oilInPressureParams,
  //     oilOutFlowParams,
  //   ]);
  //   console.log(
  //   "OIL PARAMS",
  //   oilParams.map((p) => ({
  //     originalName: p.originalName,
  //     normalizedKey: p.normalizedKey,
  //   }))
  // );
  const insight =
    "Oil system analytics loaded from backend APIs for Pressure, Temperature and Level monitoring.";
  const hasData = Object.keys(oilCharts || {}).length > 0;

  return (
    <div>
      <PageHeader
        title="Oil System Analytics"
        description="Analysis of oil pressure, temperature and flow behaviour across all available test records."
        insight={insight}
      />

      {/* Oil In Pressure */}
      {oilInPressureParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            BUG Oil In Pressure Analysis
          </h2>

          <p className="text-[13px] text-[#64748B] mb-6">
            Trend analysis and monitoring of oil inlet pressure.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {oilInPressureParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param}
                records={oilCharts?.BugOilPressure || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Oil Out Pressure */}
      {oilOutPressureParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            BUG Oil Out Pressure Analysis
          </h2>

          <p className="text-[13px] text-[#64748B] mb-6">
            Trend analysis and monitoring of oil outlet pressure.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {oilOutPressureParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={oilCharts?.BugOilOutPressure || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color="#3B82F6"
              />
            ))}
          </div>
        </section>
      )}

      {/* Oil In Temperature */}
      {oilInTemperatureParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            BUG Oil In Temperature Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {oilInTemperatureParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={oilCharts?.BugOilTemperature || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Oil Out Temperature */}
      {oilOutTemperatureParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            BUG Oil Out Temperature Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {oilOutTemperatureParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={oilCharts?.BugOilOutTemperature || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Oil Out Flow */}
      {oilOutFlowParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            BUG Oil Out Flow Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {oilOutFlowParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param as any}
                records={oilCharts?.BugOilOutFlow || []}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.oil_system?.color || "#3B82F6"}
              />
            ))}
          </div>
        </section>
      )}

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
