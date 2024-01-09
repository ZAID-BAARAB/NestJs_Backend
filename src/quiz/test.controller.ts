/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ParseIntPipe, Param, UseGuards, Delete, Req } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateQuizDto } from './dto/create-test.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';



@Controller('quiz')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.testService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testService.findOne(id);
  }

  @Get('/creator/:id')
  findByCreator(@Param('id', ParseIntPipe) creatorId: number) {
    return this.testService.findByCreator(creatorId);
  }

  @Delete('/:quizId/:userId')
  // @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  delete(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    // Pass both quizId and userId to the service
    return this.testService.delete(quizId, userId);
  }
}
