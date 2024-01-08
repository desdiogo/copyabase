import type { KpiResponse } from "@/types/kpi";
import { api } from "@/lib";

export async function useReport(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<KpiResponse>("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
