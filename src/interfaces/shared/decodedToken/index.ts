import { Role } from "@/types/roles/roles";

export interface IDecodedToken {
  fullName: string;
  email: string;
  exp: number;
  sub: string;
  role: Role;
}
