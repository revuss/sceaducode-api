import { Exclude, Expose } from 'class-transformer';
import { AuthProvider } from '../common/enums/auth-provider.enum';
import { UserRole } from '../common/enums/user-role.enum';

@Exclude()
export class UserResponseDto {
  @Expose()
  _id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  provider!: AuthProvider;

  @Expose()
  avatar!: string | null;

  @Expose()
  isEmailVerified!: boolean;

  @Expose()
  roles!: UserRole[];

  @Expose()
  lastLoginAt!: Date | null;

  @Expose()
  isActive!: boolean;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
