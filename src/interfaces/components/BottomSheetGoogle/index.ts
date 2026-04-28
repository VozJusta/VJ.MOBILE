import { Role } from "@/types/roles/roles";

export interface IBottomSheetGoogle {
  visible: boolean;
  onClose: () => void;
  onConfirm: (role: Role) => void;
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
  loading?: boolean;
}
