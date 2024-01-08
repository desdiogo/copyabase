import type { Report } from '@/schema/report'
import { kpi } from '@/utils/kpi'
import { getInactiveUsers } from './get-inactive-users'
import dayjs from 'dayjs'

export function getMonthlyRecurringRevenue(report: Report[]) {
  const newKpi = kpi()
  const inactiveUsers = getInactiveUsers(report)

  for (const [i, k] of newKpi.entries()) {
    const indexInactiveUsers = inactiveUsers.findIndex((user) => user.date.getTime() === k.lastDay.getTime())

    if (indexInactiveUsers !== -1) {
      newKpi[i].inactiveUsers = inactiveUsers[indexInactiveUsers].quantity
    }

    for (const r of report) {

      const lastDay = dayjs(k.lastDay)
      const cancellationDate = dayjs(r.cancellationDateAt)

      if (lastDay.diff(r.startDateAt) >= 0) {
        newKpi[i].activeUsers += 1
      }

      if ((r.status === 'Cancelada' || r.status === 'Trial cancelado' || r.status === 'Upgrade') && cancellationDate.diff(k.lastDay) < 0) {
        newKpi[i].activeUsers -= 1
      }

      newKpi[i].totalUsers = newKpi[i].activeUsers + newKpi[i].inactiveUsers

      const daysInMonth = lastDay.daysInMonth()
      const diffDays = lastDay.diff(r.startDateAt, 'day')

      if (lastDay.diff(r.startDateAt) >= 0) {
        if (diffDays <= daysInMonth) {
          newKpi[i].recurringRevenue += diffDays * r.valuePerDay
        } else {
          newKpi[i].recurringRevenue += daysInMonth * r.valuePerDay
        }
      }


      const diffDaysCancellationDays = lastDay.diff(r.cancellationDateAt, 'day')

      if (lastDay.diff(r.cancellationDateAt) >= 0) {
        if (diffDaysCancellationDays <= daysInMonth) {
          newKpi[i].recurringRevenue -= diffDaysCancellationDays * r.valuePerDay
        } else {
          newKpi[i].recurringRevenue -= daysInMonth * r.valuePerDay
        }
      }
    }
  }
  return newKpi
}
