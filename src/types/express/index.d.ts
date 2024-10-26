import { Role } from '@prisma/client'; // Importe o enum Role, se necessário

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Role;
      };
    }
  }
}
