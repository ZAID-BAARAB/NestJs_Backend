/* eslint-disable prettier/prettier */
//src/auth/guards/roles.quard.ts file
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles.length) {
      return false; 
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) {
      return false; 
    }

    try {
      const decoded = this.jwtService.verify(token);
      return requiredRoles.some((role) => decoded.roles.includes(role)); // Allow if the user has at least one required role
    } catch (error) {
      return false; // Invalid token, access denied
    }
  }
}
