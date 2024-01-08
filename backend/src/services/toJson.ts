import type { MultipartFile } from '@fastify/multipart'
import XLSX from 'xlsx'
import { reportSchemaArray } from '@/schema/report'

export async function toJson(file: MultipartFile) {
  const fileBuffer = await file.toBuffer()

  const workbook = XLSX.read(fileBuffer, { cellDates: true, codepage: 65001 });
  const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {})
  return reportSchemaArray.parse(json)
}