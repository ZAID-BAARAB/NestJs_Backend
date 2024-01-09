/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/test.entity';
import { CreateQuizDto } from './dto/create-test.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(dto);

    return await this.quizRepository.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

async findOne(id: number): Promise<Quiz> {
  const quiz = await
 
  this.quizRepository.findOne({
    where: {
      id,
    },
  });

  if (!quiz) {
    throw new NotFoundException(`Quiz with ID ${id} not found`);
  }
  return quiz;
}

async findByCreator(creatorId: number): Promise<Quiz[]> {
  const quizzes = await this.quizRepository.find({
    where: {
      creator_id: creatorId,
    },
  });

  if (!quizzes || quizzes.length === 0) {
    throw new NotFoundException(`No quiz found for creator with ID ${creatorId}`);
  }

  return quizzes;
}

async delete(quizId: number, userId: number): Promise<void> {
  const quiz = await this.quizRepository.findOne({
    where: { id: quizId, creator_id: userId },
  });

  if (!quiz) {
    throw new NotFoundException(`Quiz with ID ${quizId} not found for user with ID ${userId}`);
  }

  await this.quizRepository.remove(quiz);
}

}
