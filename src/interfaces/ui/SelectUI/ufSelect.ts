export interface IUfSelect {
  label: string;
  value: string;
  style?: object;
  open?: boolean;
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onInteractionChange?: (interacting: boolean) => void;
}
