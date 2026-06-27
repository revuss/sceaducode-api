import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationDto } from '../../dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('list')
  @ResponseMessage('Users retrieved successfully')
  async getAllUsers(@Body() paginationDto: PaginationDto) {
    return this.usersService.getAllUsers(paginationDto);
  }
}
