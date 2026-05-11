export interface IProfileResponse {
  id: string;
  full_name: string;
  email: string;
  cpf: string;
  avatar_image: string | null;
  phone: string;
}

export interface IUpdateProfileBody {
  full_name?: string;
  phone?: string;
}

export interface IUpdateProfileResponse {
  message: string;
}
