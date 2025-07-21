import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { LoginRequest } from './dtos/login.dto';
import { SignUpRequest } from './dtos/sign-up.dto';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(UserService)
  private readonly userService: UserService;

  async verifyUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('We could not find any user with that email');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    const isPasswordValid = await bcrypt.compare(
      password ?? '',
      user.password ?? '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(payload: LoginRequest) {
    const user = await this.userService.findUserByEmail(payload.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, expiresIn: jwtConstants.expiresIn };
  }

  signup(payload: SignUpRequest) {
    return this.userService.createUser({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      role: UserRole.Customer,
      isActive: true,
    });
  }
}
