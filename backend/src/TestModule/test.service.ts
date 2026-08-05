import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaModule/prisma.service';

@Injectable()
export class TestService {
    constructor(private prisma = PrismaService){}
    
    getTestTable(){
        
    }
}
