export interface IPasswordChecklistItem {
  label: string;
  valid: boolean;
}

export interface IPasswordStrength {
  score: number;
  color: string;
  checklist: IPasswordChecklistItem[];
}