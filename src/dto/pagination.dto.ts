import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UserRole } from '../common/enums/user-role.enum';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageIndex!: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
