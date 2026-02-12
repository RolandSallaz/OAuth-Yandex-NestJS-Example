import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { yandexConfig } from './config/yandex.config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [yandexConfig]
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
