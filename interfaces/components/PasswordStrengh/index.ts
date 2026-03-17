export interface PasswordChecklistItem {
  label: string;
  valid: boolean;
}

export interface PasswordStrengthSection {
  score: number;
  color: string;
  checklist: PasswordChecklistItem[];
}