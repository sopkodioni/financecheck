import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/prisma/generated/browser';
import { PrismaService } from 'src/PrismaModule/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async updateProfile(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id }, 
            data
        });
    }

    async updateEmail(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id }, 
            data
        });
    }

    async updatePassword(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id }, 
            data
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({ 
            where: { id }
         });
    }
}
