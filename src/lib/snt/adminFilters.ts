import { SNT_MEDIUMS, SNT_STATUSES } from "@/lib/snt/constants";
import { EDUCATION_COMPLETED_OPTIONS } from "@/lib/validation/scholarshipApplication";

export type SntAdminFilters = {
  q: string;
  status: string;
  education: string;
  medium: string;
};

export const SNT_ADMIN_FILTER_KEYS = ["q", "status", "education", "medium"] as const;

function pick(value: string | string[] | undefined, allowed?: readonly string[]): string {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  if (!allowed) return raw;
  return allowed.includes(raw) ? raw : "";
}

export function parseSntAdminFilters(params: Record<string, string | string[] | undefined>): SntAdminFilters {
  return {
    // Supabase's .or() filter string uses commas/parentheses as syntax.
    q: pick(params.q).replace(/[(),]/g, ""),
    status: pick(params.status, SNT_STATUSES),
    education: pick(params.education, EDUCATION_COMPLETED_OPTIONS),
    medium: pick(params.medium, SNT_MEDIUMS),
  };
}

export function sntAdminFilterQueryString(filters: SntAdminFilters): string {
  const params = new URLSearchParams();
  for (const key of SNT_ADMIN_FILTER_KEYS) {
    if (filters[key]) params.set(key, filters[key]);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export type SntAdminFilterOps = { eq: [column: string, value: string][]; or: string | null };

export function sntAdminFilterOps(filters: SntAdminFilters): SntAdminFilterOps {
  const eq: [string, string][] = [];
  if (filters.status) eq.push(["status", filters.status]);
  if (filters.education) eq.push(["education_completed", filters.education]);
  if (filters.medium) eq.push(["medium", filters.medium]);
  const pattern = `%${filters.q}%`;
  return {
    eq,
    or: filters.q
      ? `student_name.ilike.${pattern},phone.ilike.${pattern},whatsapp.ilike.${pattern},hall_ticket_no.ilike.${pattern}`
      : null,
  };
}
