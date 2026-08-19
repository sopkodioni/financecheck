import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import { PrismaModule } from './PrismaModule/prisma.module'
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ 
    isGlobal: true,
    envFilePath: path.resolve(process.cwd(), '../.env')
  }), PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
