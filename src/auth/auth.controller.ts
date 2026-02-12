import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
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
  async oauthYandexCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    const oauthData = req.user;
    const user = await this.authService.findOrCreateOAuthUser(oauthData); //Если пользователя не существует, то создаем, а если существует, то возвращаем его данные
    //Генерирем токены и редиректим пользователя обратно на фронтенд:
    //const tokens this.authService.generateTokens(user);
    //Возвращаем токены в параметрах
    // res.redirect(
    //   `${FRONTEND_URL}/oauth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
    // );
    //Или куки
    // res
    //   .cookie('refresh_token', tokens.refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax',
    //   })
    //   .redirect(`${FRONTEND_URL}/oauth/success`);
  }
}
