import { Injectable } from '@nestjs/common';
import { OAuthUserDto } from './dto/OAuthUserDto';

@Injectable()
export class AuthService {

  async findOrCreateOAuthUser(data: OAuthUserDto) { //Указываем возвращаемый тип Promise<User>
    // let user = ищем по емейлу
    // if (user) return user;

    //Если не нашли, то:
    //user = создаем пользователя

    // return user;
  }
}
