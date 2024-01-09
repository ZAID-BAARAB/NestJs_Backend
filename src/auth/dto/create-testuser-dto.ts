/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTestUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  
  @IsString()
  role: string; // Add role property
}
