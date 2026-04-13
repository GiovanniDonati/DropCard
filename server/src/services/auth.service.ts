import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { BadRequestException } from "../exception/bad-request";
import { UserService } from "./user.service";
import { UserRepository } from "../repositories/user.repository";
import { ErrorCode } from "../exception/root";
import { AuthResponseDto, LoginDto } from "../domain/dto/auth.dto";

export class AuthService {
  public userService = new UserService();
  public userRepository = new UserRepository();

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByName(data.name);

    if (!user) {
      throw new BadRequestException('Invalid credentials', ErrorCode.INCORRECT_CREDENTIALS);
    }

    if (!compareSync(data.password, user.password!)) {
      throw new BadRequestException('Invalid credentials', ErrorCode.INCORRECT_CREDENTIALS);
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    const userResponseDto = this.userService.mapToResponseDto(user as any);

    return {
      user: userResponseDto,
      token,
    };
  }
}
