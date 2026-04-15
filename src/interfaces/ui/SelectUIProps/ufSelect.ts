export interface UfSelectProps {
  label: string;
  value: string;
  style?: Object;
  open?: boolean;
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onInteractionChange?: (interacting: boolean) => void;
}
