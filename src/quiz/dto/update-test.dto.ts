/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-test.dto';

export class UpdateUserDto extends PartialType(CreateQuizDto) {}
