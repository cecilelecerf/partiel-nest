import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetMe } from '../auth/decorators/get-me.decorator';
import { UserRole, type User } from '../generated/prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/stats')
  getStats(@GetMe() user: User) {
    return this.usersService.getStats(user.id);
  }
  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
