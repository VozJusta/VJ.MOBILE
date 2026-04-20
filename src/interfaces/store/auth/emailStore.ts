export interface IEmailStore {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}