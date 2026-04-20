import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Code OTP reçu par mail',
    example: '482910',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @Length(6, 6)
  otp: string;
}
