
export interface IValidateCodeForgotResponse {
  message: string;
}

export interface IDecodedToken {
  fullName: string;
  email: string;
  exp: number;
  sub: string;
  role: string;
}
