import { ELIGIBLE_LEVELS, SPORTS } from "@/content/sports";
import { SPORTS_STATUSES } from "@/lib/sports/constants";

export type SportsAdminFilters = { q: string; status: string; sport: string; level: string };

const KEYS = ["q", "status", "sport", "level"] as const;

function pick(value: string | string[] | undefined, allowed?: readonly string[]): string {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  if (!allowed) return raw;
  return allowed.includes(raw) ? raw : "";
}

export function parseSportsAdminFilters(params: Record<string, string | string[] | undefined>): SportsAdminFilters {
  return {
    // Supabase's .or() filter string uses commas/parentheses as syntax.
    q: pick(params.q).replace(/[(),]/g, ""),
    status: pick(params.status, SPORTS_STATUSES),
    sport: pick(params.sport, SPORTS),
    level: pick(params.level, ELIGIBLE_LEVELS),
  };
}

export function sportsAdminFilterQueryString(filters: SportsAdminFilters): string {
  const params = new URLSearchParams();
  for (const key of KEYS) if (filters[key]) params.set(key, filters[key]);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function sportsAdminFilterOps(filters: SportsAdminFilters): { eq: [string, string][]; or: string | null } {
  const eq: [string, string][] = [];
  if (filters.status) eq.push(["status", filters.status]);
  if (filters.sport) eq.push(["sport", filters.sport]);
  if (filters.level) eq.push(["level_represented", filters.level]);
  const pattern = `%${filters.q}%`;
  return {
    eq,
    or: filters.q
      ? `student_name.ilike.${pattern},phone.ilike.${pattern},whatsapp.ilike.${pattern},entry_card_no.ilike.${pattern}`
      : null,
  };
}
