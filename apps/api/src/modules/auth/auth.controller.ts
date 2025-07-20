import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBuilder } from 'src/shared/api';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  path: 'auth',
})
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return ApiBuilder.create()
      .setData(this.authService.login(req.user))
      .setMessage('Login successful')
      .build();
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    const result = await this.authService.signup(body);

    return ApiBuilder.create()
      .setData(result)
      .setMessage('User created successfully')
      .build();
  }
}
