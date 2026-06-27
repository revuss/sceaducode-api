import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { hashPassword } from '../../lib/auth/password';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserResponseDto } from '../../dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '../../dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const user = await this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
    return user;
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    return !!(await this.userModel.exists({ email }));
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async updateUser(
    id: string,
    updates: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
  }

  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await hashPassword(newPassword);
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true },
    );
    return !!result;
  }

  async deleteSwitchUser(id: string, isDeleted: boolean): Promise<boolean> {
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { isDeleted: isDeleted },
      { new: true },
    );
    return !!result;
  }

  async disableSwitchUser(id: string, isActive: boolean): Promise<boolean> {
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true },
    );
    return !!result;
  }

  async getAllUsers(request: PaginationDto) {
    const {
      pageIndex = 0,
      pageSize = 10,
      isActive,
      isDeleted,
      searchValue,
      role,
    } = request;

    const filter: QueryFilter<UserDocument> = {
      isDeleted: isDeleted ?? false,
      ...(typeof isActive === 'boolean' && { isActive }),
      ...(role && { roles: role }),
    };

    if (searchValue?.trim()) {
      filter.$text = {
        $search: searchValue,
      };
    }

    const skip = pageIndex * pageSize;

    const [users, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('firstName lastName email roles isActive isDeleted createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec(),

      this.userModel.countDocuments(filter),
    ]);

    return {
      data: plainToInstance(UserResponseDto, users, {
        excludeExtraneousValues: true,
      }),
      total,
      pageIndex,
      pageSize,
    };
  }
}
