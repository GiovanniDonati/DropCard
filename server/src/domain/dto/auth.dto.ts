import { UserDto } from "./user.dto";

export interface LoginDto {
  name: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  password: string;
}

export interface AuthResponseDto {
  user: UserDto;
  token: string;
}