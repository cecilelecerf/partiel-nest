import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { VerifyOtpDto } from './verifyOtp.dto';

export class VerifyLoginOtpDto extends VerifyOtpDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;
}
