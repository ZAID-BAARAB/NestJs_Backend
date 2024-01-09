//this is the auth service file
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from './entities/testUser.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateTestUserDto } from './dto/create-testuser-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TestUser)
    private readonly userRepository: Repository<TestUser>,
  ) {}

  async create(data: any): Promise<TestUser> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<TestUser> {
    return this.userRepository.findOne(condition);
  }

  async findOneById(id: number): Promise<TestUser | undefined> {
    const options: FindOneOptions<TestUser> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async findOneByEmail(email: string): Promise<TestUser | undefined> {
    const options: FindOneOptions<TestUser> = { where: { email } };
    return this.userRepository.findOne(options);
  }

  //this is src/auth/auth.service.ts  file
  async createRole(data: CreateTestUserDto): Promise<TestUser> {
    const { role, ...userData } = data;
    const user = this.userRepository.create(userData);
    user.role = role || 'user'; // Default role is 'user' if not provided

    // Save the created user entity to the database
    await this.userRepository.save(user);

    // Return the saved user entity
    return user;
  }
}
