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
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { VerifyOtpDto } from 'src/auth/dto/verifyOtp.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn({ ...signInDto });
  }

  @Post('verify')
  verify(@Body() verifyInDto: VerifyOtpDto) {
    return this.authService.verifyOtp({ ...verifyInDto });
  }

  @Post('registry')
  registry(
    @Body()
    registryInDto: CreateUserDto,
  ) {
    return this.authService.registry({ ...registryInDto });
  }

  @Get('verify-email')
  verifyEmail(@Query('token') token: VerifyEmailDto) {
    return this.authService.verifyEmail({ ...token });
  }
}
