<script setup lang="ts">
import {
  BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ref, watch } from 'vue'
import type { KpiProps } from "@/schema";
import SelectYear from '@/components/SelectYear.vue'
import BaseChart from '@/components/BaseChart.vue'

interface Props {
  kpi: KpiProps[];
}

interface Option {
  label: string
  value: "recurringRevenue" | "churnRate" | "inactiveUsers" | "activeUsers"
}

defineProps<Props>()

const options: Option[] = [
  {
    label: "Receita recorrente mensal",
    value: "recurringRevenue"
  },
  {
    label: "Taxa de rotatividade",
    value: "churnRate"
  },
  {
    label: "Usuários ativos",
    value: "activeUsers"
  },
  {
    label: "Usuários inativos",
    value: "inactiveUsers"
  }
]
const selectedOption = ref<Option['value']>("recurringRevenue")
const selectedYear = ref("2022")

watch(selectedOption, (option)=> {
  if(option === 'churnRate' || option === 'inactiveUsers') selectedYear.value = "2022"
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <BaseSelect v-model="selectedOption">
      <SelectTrigger class="w-[300px]">
        <SelectValue placeholder="Selecione o gráfico" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="(option, index) in options"
            :key="index"
            :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
    <SelectYear v-model:selected-year="selectedYear" :selected-option="selectedOption" />
    <BaseChart :kpi="kpi" :selected-year="selectedYear" :selected-option="selectedOption" />
  </div>
</template>