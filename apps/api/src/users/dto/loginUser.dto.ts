import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from '../../auth/dto/registerUser.dto';

export class LoginUserDto extends PickType(RegisterUserDto, [
  'email',
  'password',
]) {}
