import { Module } from '@nestjs/common'
import { TestService } from './test.service.js';
import { TestController } from './test.controller.js';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
