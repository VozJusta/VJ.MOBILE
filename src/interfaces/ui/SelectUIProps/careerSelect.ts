export interface CareerSelectProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}