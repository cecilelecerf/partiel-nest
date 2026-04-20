import { User } from 'src/generated/prisma/client';
import { UserRole } from '../../generated/prisma/enums';

export type JwtPayload = {
  id: User['id'];
  email: User['email'];
  name: User['name'];
  role: UserRole;
};
