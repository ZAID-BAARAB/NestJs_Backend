/* eslint-disable prettier/prettier */
// src/auth/jwt.strategy.ts file
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'webavanceproject123', // Replace with your actual secret key
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.findOne({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}
