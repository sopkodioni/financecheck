import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as path from 'path'
import { PrismaModule } from './PrismaModule/prisma.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '../.env')
    }),
    PrismaModule, 
    UsersModule,
    AuthModule,
    RedisModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
