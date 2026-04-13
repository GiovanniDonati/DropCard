import { hashSync } from "bcrypt";
import { CreateUserDto, UpdateUserDto, UserDto } from "../domain/dto/user.dto";
import { User } from "../domain/entities/user.entity";
import { BadRequestException } from "../exception/bad-request";
import { ErrorCode } from "../exception/root";
import { UserRepository } from "../repositories/user.repository";

export class UserService{
  public userRepository = new UserRepository();

  public mapToResponseDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      status: user.status,
      createdAt: user.createdAt
    };
  }


  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.mapToResponseDto(user as any));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not found!', ErrorCode.NOT_FOUND);
    }
    return this.mapToResponseDto(user as any);
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    let user = await this.userRepository.findByName(data.name);
    if (user) {
      throw new BadRequestException('User already exists!', ErrorCode.ALREADY_EXISTS);
    }

    const hashedPassword = hashSync(data.password, 10);
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.mapToResponseDto(newUser as any);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
    let user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not found!', ErrorCode.NOT_FOUND);
    }

    if (data.password) {
      data.password = hashSync(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, data);
    return this.mapToResponseDto(updatedUser as any);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not found!', ErrorCode.NOT_FOUND);
    }
    await this.userRepository.delete(id);
  }
}