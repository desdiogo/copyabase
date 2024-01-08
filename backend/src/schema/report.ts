import z from 'zod'
import dayjs from 'dayjs';

const Frequency = ["Anual", "Mensal"] as const;
const Status = ["Ativa", "Atrasada", "Cancelada", "Trial cancelado", "Upgrade"] as const;

export const reportSchema = z.object({
  periodicidade: z.enum(Frequency),
  "quantidade cobranças": z.number().min(0).max(11),
  "cobrada a cada X dias": z.number().nonnegative(),
  "data início": z.date().transform(val => dayjs(val).subtract(28, 'second').toDate()),
  "data status": z.date().transform(val => dayjs(val).subtract(28, 'second').toDate()),
  "data cancelamento": z.date().optional().transform(val => {
    if (!val) return undefined

    return dayjs(val).subtract(28, 'second').toDate()
  }),
  status: z.enum(Status),
  valor: z.number().nonnegative(),
  "próximo ciclo": z.date().transform(val => dayjs(val).subtract(28, 'second').toDate()),
  "ID assinante": z.string()
}).transform((val) => ({
  id: val['ID assinante'],
  status: val.status,
  frequency: val.periodicidade,
  amountOfCharge: val['quantidade cobranças'],
  billingPeriodicity: val['cobrada a cada X dias'],
  startDateAt: val['data início'],
  cancellationDateAt: val['data cancelamento'],
  statusDateAt: val['data status'],
  nextCycleDate: val['próximo ciclo'],
  value: val.valor,
  valuePerDay: val.valor / val['cobrada a cada X dias']
}))

export const reportSchemaArray = z.array(reportSchema)

export type Report = z.infer<typeof reportSchema>