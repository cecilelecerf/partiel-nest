import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
import { GetMe } from '../auth/decorators/get-me.decorator';
import type { User } from '../generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/stats')
  getStats(@GetMe() user: User) {
    return this.usersService.getStats(user.id);
  }
}
