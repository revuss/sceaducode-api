import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StaticModule } from './modules/static/static.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppService } from './app.service';
import { GlobalProviders } from './providers/global-providers';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthCookieService } from './modules/auth-cookie/auth-cookie.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfig,
    StaticModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...GlobalProviders, AuthCookieService],
})
export class AppModule {}
