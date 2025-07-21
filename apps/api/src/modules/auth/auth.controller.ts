import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBuilder } from 'src/shared/api';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login.dto';
import { SignUpRequest } from './dtos/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  path: 'auth',
})
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequest) {
    const result = await this.authService.login(body);
    return ApiBuilder.create()
      .setData(result)
      .setMessage('Login successful')
      .build();
  }

  @Post('signup')
  async signup(@Body() body: SignUpRequest) {
    const result = await this.authService.signup(body);

    return ApiBuilder.create()
      .setData(result)
      .setMessage('User created successfully')
      .build();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me() {
    return ApiBuilder.create()
      .setData([])
      .setMessage('User fetched successfully')
      .build();
  }
}
