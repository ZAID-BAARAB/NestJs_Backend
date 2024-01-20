import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Quiz } from './quiz/entities/test.entity';
import { TestUser } from './auth/entities/testUser.entity';

import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';
import { TestModule } from './quiz/test.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Novel222@@@',
      database: 'test',
      entities: [User, Quiz, TestUser],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'webavanceproject123',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    TestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // accept HTTP request from Frontend
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
