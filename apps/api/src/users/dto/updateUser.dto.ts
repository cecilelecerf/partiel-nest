import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../generated/prisma/enums';
import { RegisterUserDto } from '../../auth/dto/registerUser.dto';

export class UpdateUserDto extends PartialType(
  PickType(RegisterUserDto, ['name']),
) {
  @ApiProperty({ enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
