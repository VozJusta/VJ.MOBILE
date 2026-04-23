import { Role } from "@/types/roles/roles";

export interface ISignInResponse {
  validated: boolean;
  sub: string;
  role: Role;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
  sessionId: string;
}
