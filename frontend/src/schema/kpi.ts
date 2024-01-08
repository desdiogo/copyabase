import z from 'zod'
import dayjs from 'dayjs'

const kpitSchema = z.object({
  firstDay: z.coerce.date(),
  lastDay:  z.coerce.date(),
  inactiveUsers: z.coerce.number().nonnegative(),
  activeUsers: z.coerce.number().nonnegative(),
  totalUsers: z.coerce.number().nonnegative(),
  recurringRevenue:  z.coerce.number().nonnegative(),
}).transform((val) => ({
  ...val,
  mounth: dayjs(val.lastDay).format("MMM"),
  year: dayjs(val.lastDay).format("YYYY"),
  churnRate: ( val.inactiveUsers / (val.activeUsers + val.inactiveUsers) * 100).toFixed(2)
}))

export const kpiSchemaArray = z.array(kpitSchema)

export type KpiProps = z.infer<typeof kpitSchema>