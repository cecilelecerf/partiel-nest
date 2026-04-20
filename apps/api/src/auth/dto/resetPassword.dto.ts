import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './registerUser.dto';

export class ResetPasswordDto extends PickType(RegisterUserDto, [
  'password',
  'confirmPassword',
]) {}
