import { User } from 'src/prisma/generated/client';

export type UserWithoutPassHash = Omit<User, 'passHash' | 'updatedAt'>