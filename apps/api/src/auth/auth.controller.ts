import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyTokenDto } from './dto/verifyEmail.dto';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { VerifyLoginOtpDto as VerifyLoginDto } from './dto/verifyLoginOtp.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Connexion',
    description: 'Envoie un OTP par email si les identifiants sont valides',
  })
  @ApiResponse({
    status: 200,
    schema: { example: { message: 'Code envoyé par mail' } },
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants incorrects ou email non vérifié',
  })
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('verify')
  @ApiOperation({
    summary: "Vérifier l'OTP",
    description: 'Vérifie le code OTP et retourne les tokens JWT',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        access_token: 'eyJhbGc...',
        refresh_token: 'eyJhbGc...',
        user: { id: 1, email: 'user@exemple.com', role: 'USER' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'OTP invalide ou expiré' })
  verify(@Body() verifyInDto: VerifyLoginDto) {
    return this.authService.verifyLogin(verifyInDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Inscription',
    description: 'Crée un compte et envoie un email de vérification',
  })
  @ApiResponse({
    status: 201,
    schema: { example: { message: 'Email de vérification envoyé' } },
  })
  @ApiResponse({ status: 400, description: 'Mots de passe non identiques' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  registry(
    @Body()
    registryInDto: RegisterUserDto,
  ) {
    return this.authService.registry(registryInDto);
  }

  @Get('verify-email')
  @ApiOperation({
    summary: "Vérifier l'email",
    description: "Valide le token reçu par email lors de l'inscription",
  })
  @ApiQuery({
    name: 'token',
    type: String,
    description: 'Token JWT reçu par email',
  })
  @ApiResponse({
    status: 200,
    schema: { example: { message: 'Inscription validée' } },
  })
  @ApiResponse({ status: 401, description: 'Token invalide ou expiré' })
  verifyEmail(@Query() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verifyEmailRegister({
      token: verifyTokenDto.token,
    });
  }
  @Post('forgot-password')
  @ApiOperation({
    summary: 'Mot de passe oublié',
    description: "Envoie un email de réinitialisation si l'email existe",
  })
  @ApiResponse({
    status: 201,
    schema: { example: { message: 'Email de réinitialisation envoyé' } },
  })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
  @Post('reset-password')
  @ApiOperation({ summary: 'Réinitialiser le mot de passe' })
  @ApiQuery({
    name: 'token',
    type: String,
    description: 'Token JWT reçu par email',
  })
  @ApiResponse({
    status: 201,
    schema: { example: { message: 'Mot de passe modifié' } },
  })
  @ApiResponse({ status: 400, description: 'Mots de passe non identiques' })
  @ApiResponse({ status: 401, description: 'Token invalide ou expiré' })
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
