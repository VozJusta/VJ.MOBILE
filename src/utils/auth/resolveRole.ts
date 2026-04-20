import { Role } from "@/types/roles/roles";

function normalizeRoleValue(value: unknown): Role | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized.includes("lawyer") || normalized.includes("advogado")) {
    return "lawyer";
  }

  if (normalized.includes("citizen") || normalized.includes("cidadao") || normalized.includes("cidadão")) {
    return "citizen";
  }

  return null;
}

export function resolveRoleFromApi(payload: unknown, fallback: Role = "citizen"): Role {
  const data = (payload ?? {}) as Record<string, unknown>;

  const candidates: unknown[] = [
    data.role,
    data.userRole,
    data.user_type,
    data.userType,
    (data.user as Record<string, unknown> | undefined)?.role,
    (data.profile as Record<string, unknown> | undefined)?.role,
    (data.data as Record<string, unknown> | undefined)?.role,
  ];

  for (const candidate of candidates) {
    const resolved = normalizeRoleValue(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return fallback;
}
