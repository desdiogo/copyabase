<script setup lang="ts">
import { ref } from "vue";
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import UploadFile from "./components/UploadFile.vue";
import type { Kpi } from "./types/kpi";
import SelectMode from '@/components/SelectMode.vue'
import SelectReport from '@/components/SelectReport.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import type { KpiProps } from '@/schema'

dayjs.locale('pt-br')

const kpi = ref<KpiProps[]>([]);

function setKpi(newKpi: KpiProps[]) {
  kpi.value = newKpi;
}
</script>

<template>
  <div class="container flex min-h-screen flex-col p-4 gap-4">
    <SelectMode />
    <UploadFile @upload="setKpi" />
    <SelectReport :kpi="kpi" v-if="kpi.length > 0" />
  </div>
  <Toaster />
</template>
