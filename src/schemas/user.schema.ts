import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthProvider } from '../common/enums/auth-provider.enum';
import { UserRole } from '../common/enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop()
  password?: string;

  @Prop({
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider!: AuthProvider;

  @Prop({
    default: null,
  })
  providerId!: string | null;

  @Prop({
    default: null,
  })
  avatar!: string | null;

  @Prop({
    default: false,
  })
  isEmailVerified!: boolean;

  @Prop({
    type: [String],
    enum: UserRole,
    default: [UserRole.STUDENT],
  })
  roles!: UserRole[];

  @Prop({
    default: null,
  })
  refreshToken!: string | null;

  @Prop({
    default: null,
  })
  accessToken!: string | null;

  @Prop({
    default: null,
  })
  lastLoginAt!: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
