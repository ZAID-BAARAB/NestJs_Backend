/* eslint-disable prettier/prettier */
// create-quiz.dto.ts
import {
  // IsString,
  // IsNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateQuizDto {
  // @IsNotEmpty()
  @IsOptional()
  title: string ;

  @IsOptional()
  creatorUserName?: string;
  // @IsNotEmpty()
  quizData: any;

  @IsOptional()
  @IsArray()
  studentsList: string[];

  @IsOptional()
  @IsDateString()
  dateOfCreation?: Date;
}