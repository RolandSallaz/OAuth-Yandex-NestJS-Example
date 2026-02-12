#Как происходит OAuth запрос

[ Клиент (браузер) ]
        |
        | 1. GET /auth/yandex
        v
[ NestJS Controller ]
        |
        | 2. AuthGuard('yandex')
        v
[ Passport (yandex strategy) ]
        |
        | 3. Редирект на Yandex OAuth
        v
[ Yandex OAuth ]
        |
        | 4. Пользователь логинится
        |    и подтверждает доступ
        v
[ Yandex OAuth ]
        |
        | 5. Редирект обратно с параметром ?code=...
        v
[ GET /auth/yandex/callback ]
        |
        | 6. AuthGuard('yandex')
        v
[ passport-yandex ]
        |
        | 7. Обмен code → accessToken
        | 8. Запрос профиля пользователя
        v
[ YandexStrategy.validate() ]
        |
        | 9. Приведение профиля к OAuthUserDto
        |    (provider, providerId, email, name)
        v
[ req.user = OAuthUserDto ]
        |
        v
[ AuthController callback ]
        |
        | 10. authService.findOrCreateOAuthUser()
        |     - поиск пользователя
        |     - регистрация при необходимости
        v
[ User entity ]
        |
        | 11. генерируем токены
        v
[ JWT access + refresh tokens ]
        |
        v
[ Ответ клиенту ]
