/* eslint-disable prettier/prettier */
// this is  src/auth/guards/jwt.auth.guards.ts file
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}