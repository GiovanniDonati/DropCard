import { prisma } from "../config/prisma";
import { User } from "../domain/entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "../domain/dto/user.dto";
import { Status } from "../domain/entities/enums";

export class UserRepository {
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany() as User[];
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id }}) as User | null;
  }

  async findByName(name: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { name }}) as User | null;
  }

  async create(data: CreateUserDto): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        password: data.password,
        status: Status.ACTIVE,
      }
    }) as User;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        password: data.password,
        status: data.status as Status,
      }
    }) as User;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
