import { Body, Controller, Get, NotFoundException, Patch} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/prisma/generated/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    async getUser(): Promise<User | null> {
        const mockId = "1"; // temp, need uuid
        return this.usersService.findById(mockId);
    }

    @Patch('me')
    async updateUser(@Body() updateUserDto: UpdateUserDto) : Promise<User>{
        const mockId = "1"; // temp, need uuid
        const user = await this.usersService.updateProfile(mockId, updateUserDto)
        
        if(!user){
            throw new NotFoundException("User not found");
        }

        return user;
    }
}
