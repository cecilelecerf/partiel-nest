import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../types/jwt';
import { UserRole } from 'src/generated/prisma/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    const user = context
      .switchToHttp()
      .getRequest<Request & { user: JwtPayload }>().user;
    if (!user) {
      throw new ForbiddenException();
    }
    return requiredRoles.includes(user.role);
  }
}
