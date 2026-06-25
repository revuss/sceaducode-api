import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { AppService } from '../app.service';
import { GlobalExceptionFilter } from '../common/interceptors/global.exception.filter';

export const GlobalProviders = [
  AppService,
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
];
