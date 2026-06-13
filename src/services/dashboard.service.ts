import type { DashboardSummary } from "../models";
import { api } from "./api";

export async function getDashboardSummary() {
  const response = await api.get<DashboardSummary>("/dashboard/summary");
  return response.data;
}
