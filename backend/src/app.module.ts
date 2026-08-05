import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import { PrismaModule } from './PrismaModule/prisma.module'

@Module({
  imports: [ConfigModule.forRoot({ 
    isGlobal: true,
    envFilePath: path.resolve(process.cwd(), '../.env')
  }), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
