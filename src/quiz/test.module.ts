import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { Quiz } from './entities/test.entity';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
