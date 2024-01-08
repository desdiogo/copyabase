export interface Kpi {
  firstDay: Date
  lastDay: string
  inactiveUsers: number
  activeUsers: number
  totalUsers: number
  recurringRevenue: number
}

export interface KpiResponse {
  kpi: Kpi[]
}