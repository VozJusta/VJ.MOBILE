export interface ICareerSelect {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}