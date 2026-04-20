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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Lister tous les utilisateurs',
    description: 'Réservé aux admins',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          email: 'user@exemple.com',
          name: 'Jean Dupont',
          role: 'USER',
          isVerifiedEmail: true,
          createdAt: '2024-01-15T10:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/stats')
  @ApiOperation({ summary: "Statistiques de l'utilisateur connecté" })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        totalWorkouts: 12,
        totalDuration: 360,
        uniqueExercises: 8,
      },
    },
  })
  getStats(@GetMe() user: User) {
    return this.usersService.getStats(user.id);
  }
  @Roles(UserRole.ADMIN)
  @Get(':id')
  @ApiOperation({
    summary: "Détail d'un utilisateur",
    description: 'Réservé aux admins',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un utilisateur',
    description: 'Réservé aux admins',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
