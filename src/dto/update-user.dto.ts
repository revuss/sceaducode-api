import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  refreshToken!: string | null;

  @IsDate()
  @IsOptional()
  lastLoginAt!: Date | null;
}
