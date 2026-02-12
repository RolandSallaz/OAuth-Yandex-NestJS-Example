import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { YandexAuthGuard } from './guards/yandex-auth';
import type { OAuthRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('yandex/login')
  @UseGuards(YandexAuthGuard)
  oauthLoginYandex() {
    //Оставляем пустым
  }

  @Get('yandex/callback')
  @UseGuards(YandexAuthGuard)
  async oauthYandexCallback(@Req() req: OAuthRequest) {
    const oauthData = req.user;
    console.log(oauthData)
    const user = await this.authService.findOrCreateOAuthUser(oauthData); //Если пользователя не существует, то создаем, а если существует, то возвращаем его данные
    //Генерирем токены и возвращаем их, например:
    //return this.authService.generateTokens(user);
  }
}
