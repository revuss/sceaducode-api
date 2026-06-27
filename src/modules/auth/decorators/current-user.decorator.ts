import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from '../../../common/interfaces/current-user.interface';

type RequestWithUser = Request & { user: CurrentUser };

export const CurrentUserDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
