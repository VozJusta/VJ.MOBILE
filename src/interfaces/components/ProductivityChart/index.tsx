"use client";
import { ProductivityChartProps } from "@/types/components/ProductivityChart";
import { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";

const BLUE = "rgb(37, 133, 244)";
const BLUE_LIGHT = "rgba(37, 133, 244, 0.15)";
const AXIS_COLOR = "rgb(148, 163, 184)";
const GRID_COLOR = "rgba(255, 255, 255, 0.05)";
const TOOLTIP_BG = "rgb(20, 27, 36)";
const TOOLTIP_BORDER = "rgb(27, 34, 51)";

export function ProductivityChart({ data, style }: ProductivityChartProps) {
  const screenWidth = Dimensions.get("window").width;

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        value: typeof d.value === "number" ? d.value : Number(d.value) || 0,
        label: String(d.date),
        dataPointText: "",
      })),
    [data],
  );

  const maxValue = useMemo(
    () => Math.max(...chartData.map((d) => d.value), 0) + 10,
    [chartData],
  );

  const CustomTooltip = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipLabel}>Dia {label}</Text>
      <Text style={styles.tooltipValue}>{value} casos</Text>
      <Text style={styles.tooltipSub}>Processados</Text>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <LineChart
        data={chartData}
        width={screenWidth - 48}
        height={220}
        color={BLUE}
        thickness={2}
        areaChart
        startFillColor={BLUE}
        endFillColor="transparent"
        startOpacity={0.3}
        endOpacity={0}
        rulesColor={GRID_COLOR}
        rulesType="solid"
        xAxisColor="transparent"
        yAxisColor="transparent"
        xAxisLabelTextStyle={styles.axisLabel}
        yAxisTextStyle={styles.axisLabel}
        yAxisTextNumberOfLines={1}
        hideDataPoints
        maxValue={maxValue}
        spacing={(screenWidth - 96) / Math.max(chartData.length - 1, 1)}
        initialSpacing={0}
        endSpacing={0}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: BLUE,
          pointerStripWidth: 1,
          pointerColor: BLUE,
          radius: 5,
          pointerLabelWidth: 130,
          pointerLabelHeight: 70,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (
            items: Array<{ value: number; label: string }>,
          ) => {
            const item = items[0];
            if (!item) return null;
            return <CustomTooltip value={item.value} label={item.label} />;
          },
        }}
        animateOnDataChange
        animationDuration={1500}
        onDataChangeAnimationDuration={1500}
        curveType={CurveType.CUBIC}
        curved
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  axisLabel: {
    color: AXIS_COLOR,
    fontSize: 12,
  },
  tooltip: {
    backgroundColor: TOOLTIP_BG,
    borderWidth: 1,
    borderColor: TOOLTIP_BORDER,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    minWidth: 120,
  },
  tooltipLabel: {
    color: "rgb(241, 245, 249)",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 2,
  },
  tooltipValue: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "500",
  },
  tooltipSub: {
    color: AXIS_COLOR,
    fontSize: 11,
    marginTop: 1,
  },
});
