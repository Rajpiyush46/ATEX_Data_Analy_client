import { useMemo } from "react";
import AnalyticsChart from "@/components/ui/AnalyticsChart";
import type { GeneratorRecord } from "@/types/generator";
import type { ColumnSchema } from "@/utils/schemaEngine";
import { getColumnStats, generateParameterInsight } from "@/utils/analytics";
import { useState } from "react";
import ChartModal from "./ChartModal";

interface ParameterModuleProps {
  columnSchema: ColumnSchema;
  records: GeneratorRecord[];
  delay?: number;
  chartType?: "line" | "area" | "bar";
  color?: string;
}

export default function ParameterModule({
  columnSchema,
  records,
  delay = 0,
  chartType = "area",
  color = "#2563EB",
}: ParameterModuleProps) {
  const { originalName, unit, description } = columnSchema;
  // need to check for the naming >> Ayush /Prateek/Piyush
  const dataKey = useMemo(() => {
    if (!records?.length) {
      return originalName.split("(")[0];
    }

    const schemaKey = originalName
      .split("(")[0]
      .toLowerCase()
      .replace(/[_\s]/g, "");

    const matchedKey = Object.keys(records[0]).find(
      (key) => key.toLowerCase().replace(/[_\s]/g, "") === schemaKey
    );

    return matchedKey || originalName.split("(")[0];
  }, [records, originalName]);
  
  console.log("ORIGINAL NAME", originalName);
  console.log("DATA KEY", dataKey);
  console.log("FIRST RECORD", records?.[0]);
  const stats = useMemo(
    () => getColumnStats(records, dataKey),
    [records, dataKey]
  );

  // comment to me done why this is??? Ayush /Prateek
  const chartData = useMemo(() => {
    return records.slice(0, 500).map((r: any, i: number) => ({
      index: i + 1,
      value: Number(r[dataKey]),
    }));
  }, [records, dataKey]);

  const [openModal, setOpenModal] = useState(false);
  const insight = useMemo(
    () => generateParameterInsight(columnSchema, stats),
    [columnSchema, stats]
  );

  console.log("CHART CHECK", originalName, stats.count, records?.length);
  const hasNoData = stats.count === 0;

  return (
    <>
      {/* Dashboard Chart */}
      <div onClick={() => setOpenModal(true)} className="cursor-pointer">
        <AnalyticsChart
          title={originalName}
          description={description || insight}
          data={chartData}
          dataKey="value"
          xLabel="Sample"
          yLabel={unit || ""}
          type={chartType}
          color={color}
          min={stats.min}
          max={stats.max}
          avg={stats.avg}
          variance={stats.variance}
          unit={unit}
          delay={delay}
        />
      </div>

      {/* Modal */}
      <ChartModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        vtName={dataKey}
      >
        {hasNoData ? (
          <div className="text-center py-10 text-gray-500">No Data Found</div>
        ) : (
          <AnalyticsChart
            title={originalName}
            description={description || insight}
            data={chartData}
            dataKey="value"
            xLabel="Sample"
            yLabel={unit || ""}
            type={chartType}
            color={color}
            min={stats.min}
            max={stats.max}
            avg={stats.avg}
            variance={stats.variance}
            unit={unit}
          />
        )}
      </ChartModal>
    </>
  );
}
