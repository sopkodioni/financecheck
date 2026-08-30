import { Body, Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/prisma/generated/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getUser(@Req() req: AuthenticatedRequest): Promise<User | null> {
        const userId = req.user.userId;
        return this.usersService.findById(userId);
    }

    @Patch('me')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Req() req: any, @Body() updateUserDto: UpdateUserDto) : Promise<User>{
        const userId = req.user.userId;
        return this.usersService.updateProfile(userId, updateUserDto)
    }
}
