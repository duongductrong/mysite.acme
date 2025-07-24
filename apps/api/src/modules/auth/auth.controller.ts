import { milliseconds, Time } from '@/utils/time';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { omit } from 'lodash';
import { ApiBuilder } from 'src/shared/api';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenRequest } from './dtos/refresh-token.dto';
import { SignUpRequest } from './dtos/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { jwtConstants } from './jwt.constants';

@Controller({
  path: 'auth',
})
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(user);

    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(jwtConstants.expiresIn),
    });

    console.log(milliseconds(jwtConstants.refreshExpiresIn as Time));

    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: milliseconds(jwtConstants.refreshExpiresIn as Time),
    });

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
  async me(@CurrentUser() user: UserEntity) {
    return ApiBuilder.create()
      .setData(omit(user, ['refreshToken', 'password']))
      .setMessage('User fetched successfully')
      .build();
  }

  @Post('refresh-token')
  async refresh(@Body() body: RefreshTokenRequest) {
    const refreshToken = body.refreshToken;

    const newAccessToken = await this.authService.refresh(refreshToken);

    return ApiBuilder.create()
      .setData({
        accessToken: newAccessToken,
      })
      .setMessage('Token refreshed successfully')
      .build();
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async google() {
    return ApiBuilder.create()
      .setData({})
      .setMessage('Auth successful')
      .build();
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/callback/:providerId')
  async oauthCallback(@Param('providerId') providerId: string) {
    return ApiBuilder.create()
      .setData({
        providerId,
      })
      .setMessage('Auth successful')
      .build();
  }
}
