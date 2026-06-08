export interface IContactCard {
  name: string;
  phone: string;
  email: string;
  onPressPhone: () => void;
  onPressEmail: () => void;
}