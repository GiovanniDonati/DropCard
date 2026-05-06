export interface LoginDto {
  name: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  user: {
    id: string;
    name: string;
  };
}
