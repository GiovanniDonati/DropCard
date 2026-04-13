import { Status } from "../entities/enums"

export interface UserDto {
  id: string;
  name: string;
  status: Status;
  createdAt: Date;
}

export interface CreateUserDto {
  name: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  password?: string;
  status?: Status;
}