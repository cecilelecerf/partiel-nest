import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('verify')
  verify(@Body() verifyInDto: Record<string, any>) {
    return this.authService.verifyOtp(verifyInDto.otp);
  }

  @Post('registry')
  registry(
    @Body()
    registryInDto: {
      email: User['email'];
      password: User['password'];
      name: User['name'];
    },
  ) {
    return this.authService.registry({ ...registryInDto });
  }

  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
