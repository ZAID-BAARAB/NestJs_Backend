import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { CreateTestUserDto } from './dto/create-testuser-dto';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guards';
import { RolesGuard } from './guards/roles.quard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateTestUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.authService.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      profession: createUserDto.profession,
      country: createUserDto.country,
      age: createUserDto.age,
    });

    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.authService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      roles: [user.role],
    });

    response.cookie('jwt', jwt, { httpOnly: true });

    // returner 'you are logged in successfully';

    delete user.password;

    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOneById(data['id']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'you are logged out',
    };
  }

  @Get('feedback')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getFeedback() {
    return 'Hello from feedback';
  }
}
