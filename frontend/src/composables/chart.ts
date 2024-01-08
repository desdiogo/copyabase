import * as d3 from "d3";
import { onMounted, ref } from "vue";

export function useChart(selector: string) {
  const margin = { top: 30, right: 30, bottom: 70, left: 60 }
  const width = 900 - margin.left - margin.right
  const height = 600 - margin.top - margin.bottom

  const svg = ref<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const xAxis  = ref<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const yAxis  = ref<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const x = ref<d3.ScaleBand<string>>()
  const y = ref<d3.ScaleLinear<number, number, never>>()

  function createChart() {
    svg.value = d3
      .select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    x.value = d3.scaleBand()
      .range([ 0, width ])
      .padding(0.2);

    xAxis.value = svg.value.append("g")
      .attr("transform", `translate(0,${height})`);

    y.value = d3.scaleLinear()
      .range([ height, 0]);

    yAxis.value = svg.value.append("g")
      .attr("class", "myYaxis");
  }

  function updateChart<Data, Key extends keyof Data>(data: Data[], attrX: Key, attrY: Key) {


    x.value?.domain(data.map(d => d[attrX] as string));
    xAxis.value?.transition().duration(1000).call(d3.axisBottom(x.value!));

    y.value?.domain([0, d3.max(data, d => +d[attrY] as any) ])
    yAxis.value?.transition().duration(1000).call(d3.axisLeft(y.value!));

    const u = svg.value?.selectAll("rect")
      .data(data)

    u!.join("rect")
      .transition()
      .duration(1000)
      .attr("x", (d) => x.value!(d[attrX] as any) as any)
      .attr("y", (d) => y.value!(d[attrY] as any))
      .attr("width", x.value!.bandwidth())
      .attr("height", (d) => height - y.value!(d[attrY] as any))
  }

  onMounted(() => {
    createChart()
  })

  return {
    updateChart
  }
}