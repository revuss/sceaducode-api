import { APP_INTERCEPTOR } from '@nestjs/core';

import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { AppService } from '../app.service';

export const GlobalProviders = [
  AppService,
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
];
