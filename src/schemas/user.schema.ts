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

  @Prop({ type: String, default: null })
  providerId!: string | null;

  @Prop({
    type: String,
    default: null,
  })
  avatar!: string | null;

  @Prop({
    default: false,
  })
  isEmailVerified!: boolean;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role!: UserRole;

  @Prop({
    type: String,
    default: null,
  })
  refreshToken!: string | null;

  @Prop({
    type: Date,
    default: null,
  })
  lastLoginAt!: Date | null;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
