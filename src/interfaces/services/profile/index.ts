export interface IProfileResponse {
  id: string;
  full_name: string;
  email: string;
  cpf: string;
  avatar_image: string | null;
  phone: string;
  bio: string | null;
}

export interface IUpdateProfileBody {
  fullName?: string;
  phone?: string;
  bio?: string;
}

export interface IUpdateProfileResponse {
  message: string;
}
