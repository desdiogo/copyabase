<script setup lang="ts">
import { BaseLabel } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useVModel } from '@vueuse/core'

interface Props {
  selectedYear: string
  selectedOption: string
}

const emit = defineEmits<{
  "update:selectedYear": [value: string]
}>()

const props = defineProps<Props>()

const selectedYear = useVModel(props, 'selectedYear', emit );
</script>

<template>
  <RadioGroup v-model="selectedYear">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-one" value="2022" />
      <BaseLabel for="option-one">2022</BaseLabel>
    </div>
    <div class="flex items-center space-x-2" v-if="selectedOption !=='churnRate' && selectedOption !=='inactiveUsers'">
      <RadioGroupItem id="option-two" value="2023" />
      <BaseLabel for="option-two">2023</BaseLabel>
    </div>
  </RadioGroup>
</template>