/* eslint-disable prettier/prettier */
// this is src/auth/decorators/roles.decorator.js
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'webavanceproject123';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
