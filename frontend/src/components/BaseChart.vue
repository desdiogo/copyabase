<script lang="ts" setup>
import { useChart } from "@/composables";
import type { KpiProps } from "@/schema";
import { onMounted, watch } from 'vue'

interface Props {
  kpi: KpiProps[];
  selectedYear: string;
  selectedOption: keyof KpiProps
}

const props = defineProps<Props>();
const { updateChart } = useChart("#chart");

function getKpiByYear(year: string) {
  return props.kpi.filter((k) => k.year === year)
}

watch([() => props.selectedYear, () => props.selectedOption], ([selectedYear, selectedOption]) => {
  updateChart(getKpiByYear(selectedYear), "mounth", selectedOption);
})

onMounted(() => {
  updateChart(getKpiByYear(props.selectedYear), "mounth", props.selectedOption);
});
</script>

<template>
  <div id="chart" />
</template>