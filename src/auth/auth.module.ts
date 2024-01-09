//this is src/auth/auth.module.ts  file
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entities/testUser.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'webavanceproject123', // Replace with  actual secret key in .env
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([TestUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
