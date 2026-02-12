import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { YandexStrategy } from './strategies/yandex-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, YandexStrategy],
})
export class AuthModule { }
