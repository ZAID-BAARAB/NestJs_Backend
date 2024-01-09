import { IsOptional, IsString } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IsUniqueConstraint } from '../../shared/validation/is-unique-constraint';
import { IsUnique } from '../../shared/validation/is-unique';

export class CreateUserDto {
  // @IsString()
  //   @Validate(IsUniqueConstraint)
  @IsUnique({ tableName: 'user', column: 'username' })
  username: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  role: string;
}
