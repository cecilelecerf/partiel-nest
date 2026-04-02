import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators/roles.decorator';
import { JwtPayload } from '../types/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
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
