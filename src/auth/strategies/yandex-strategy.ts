import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-yandex';
import { OAuthUserDto } from '../dto/OAuthUserDto';
import { yandexConfig } from 'src/config/yandex.config';
import type { TYandexConfig } from 'src/config/yandex.config';

@Injectable()
export class YandexStrategy extends PassportStrategy(
    Strategy, //Стратегия обязательно должна импортироваться из passport-yandex
    'yandex',
) {
    constructor(
        @Inject(yandexConfig.KEY)
        private readonly config: TYandexConfig
    ) {
        super({
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURL
        });
    }
    validate(
        //Яндекс нам возвращает токены и профиль пользователя
        accessToken: string, //Токены нам не нужны, так как мы генерируем свои, поэтому их не возвращаем
        refreshToken: string,
        profile: Profile,
    ): OAuthUserDto {
        return {
            provider: 'yandex', //Указываем явно, что мы зарегистировались с яндекса, это помогает отличить, если допустим мы вошли через гугл
            providerId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            //Также можно допустим получать аватарку пользователя и другие данные, которые нужны для регистарции
        };
    }
}
