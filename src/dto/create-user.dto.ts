import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../common/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  confirmPassword!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}
