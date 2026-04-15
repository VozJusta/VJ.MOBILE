import { Role } from "@/types/roles/roles";

export interface IRoleStore {
  role: Role | null;
  setRole: (role: Role) => void;
  clearRole: () => void;
}
