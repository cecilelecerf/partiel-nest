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
import { VerifyTokenDto } from './dto/verifyEmail.dto';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { VerifyLoginOtpDto as VerifyLoginDto } from './dto/verifyLoginOtp.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('verify')
  verify(@Body() verifyInDto: VerifyLoginDto) {
    return this.authService.verifyLogin(verifyInDto);
  }

  @Post('register')
  registry(
    @Body()
    registryInDto: RegisterUserDto,
  ) {
    return this.authService.registry(registryInDto);
  }

  @Get('verify-email')
  verifyEmail(@Query() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verifyEmailRegister({
      token: verifyTokenDto.token,
    });
  }
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
  @Post('reset-password')
  resetPassword(
    @Query() verifyTokenDto: VerifyTokenDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword({
      ...resetPasswordDto,
      ...verifyTokenDto,
    });
  }
}
