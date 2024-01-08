import type { Report } from '@/schema/report'
import dayjs from 'dayjs';

export function getInactiveUsers(report: Report[]) {
  return report.filter(r => r.status === 'Cancelada' || r.status === 'Trial cancelado' || r.status === 'Upgrade')
    .map(r => {
      const month = dayjs(r.cancellationDateAt).month()
      const year = dayjs(r.cancellationDateAt).year()
      const date = dayjs().month(month).year(year).endOf('month').toDate()
      return {
        date,
        id: r.id
      }
    }).reduce((acumulator, current) => {
      const index = acumulator.findIndex((acc) => acc.date.getTime() === current.date.getTime())
      if (index !== -1) {
        acumulator[index].quantity += 1
      } else {
        acumulator.push({
          date: current.date,
          quantity: 1
        })
      }

      return acumulator
    }, <{ date: Date, quantity: number }[]>[])
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}