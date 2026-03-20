import { MaterialIcons } from "@expo/vector-icons";

export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}

export interface UfSelectProps {
  label: string;
  value: string;
  style?: Object;
  open?: boolean;
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onInteractionChange?: (interacting: boolean) => void;
}

export interface CareerSelectProps {
  label: string;
  values: string[];
  options: string[];
  onValuesChange: (values: string[]) => void;
}

export interface IButtonProfile {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  colorIcon: string;
  bgIcon: string;
  namebutton: string;
  path: string;
  NextButton: boolean
}
