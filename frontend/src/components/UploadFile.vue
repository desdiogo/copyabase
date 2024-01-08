<script lang="ts" setup>
import { ref } from "vue";
import { useReport } from "@/composables";
import { BaseButton } from '@/components/ui/button'
import { BaseLabel } from '@/components/ui/label'
import { BaseInput } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import type { KpiProps } from "@/schema";
import { kpiSchemaArray } from "@/schema";
import type { AxiosError } from 'axios'


const emit = defineEmits<{
  upload: [kpi: KpiProps[]];
}>();

const { toast } = useToast()

const file = ref<File | null>();
const disabled = ref(false)

function onFileChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

async function handleUploadFile() {
  emit("upload", [])

  if (!file.value) {
    toast({
      title: 'Relatório',
      description: 'Não foi selecionado relatório.',
    });
    return
  }

  disabled.value = true
  try {
    const data = await useReport(file.value);
    const { kpi } = data;
    const kpiProps = kpiSchemaArray.parse(kpi)
    emit("upload", kpiProps)
  } catch (e) {
    const error = e as AxiosError

    if(error.response?.status === 400) {
      toast({
        title: 'Falha no envio',
        description: 'O arquivo enviado está no formado incorreto.',
      })
    }
  } finally {
    disabled.value = false
  }
}
</script>

<template>
  <div class="flex justify-between">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <BaseLabel for="report">Relatório</BaseLabel>
      <BaseInput id="report" type="file" @change="onFileChanged" />
    </div>
      <BaseButton @click="handleUploadFile" :disabled="disabled">Gerar Relatório</BaseButton>
  </div>
</template>
