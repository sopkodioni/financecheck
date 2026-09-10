import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { PrismaClientException } from './common/filters/prisma-client-exception.filter'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService);
  const frontendPort = configService.getOrThrow<string>('FRONTEND_PORT');
  const port = configService.getOrThrow<number>('BACKEND_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new PrismaClientException())
  app.enableCors({
    origin: `http://localhost:${frontendPort}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await app.listen(port)
}
bootstrap()
