import dayjs from "dayjs";
import type { Kpi } from "@/@types/kpi";

export function kpi() {
  const firstMounth = 0
  const lastMount = 11
  const firstYear = 2022
  const lastYear = 2023

  const arr: Kpi[] = []

  for (let i = firstYear; i <= lastYear; i++) {
    for (let j = firstMounth; j <= lastMount; j++) {
      arr.push({
        firstDay: dayjs().month(j).year(i).startOf('month').toDate(),
        lastDay: dayjs().month(j).year(i).endOf('month').toDate(),
        inactiveUsers: 0,
        activeUsers: 0,
        totalUsers: 0,
        recurringRevenue: 0
      })
    }
  }

  return arr
}