# Как происходит OAuth запрос

1. **Клиент (браузер)**  
   Фронтенд кликает на кнопку
   
```html
<button
  onClick={() => {
    window.location.href = 'https://нашБекенд/auth/yandex/login';
  }}
>
  Войти через Яндекс
</button>
```

И тем самым отправляет запрос `GET /auth/yandex`.

2. **NestJS Controller**  
   Запрос перехватывается `AuthGuard('yandex')`.

3. **Passport (yandex strategy)**  
   Пользователь перенаправляется на страницу OAuth Яндекса.

4. **Yandex OAuth**  
   Пользователь логинится и подтверждает доступ.

5. **Yandex OAuth → callback**  
   Яндекс делает редирект обратно на  
   `GET /auth/yandex/callback?code=...`.

6. **AuthGuard('yandex')**  
   Guard снова перехватывает запрос callback.

7. **passport-yandex**  
   - обменивает `code` на `accessToken`  
   - запрашивает профиль пользователя

8. **YandexStrategy.validate()**  
   Профиль приводится к `OAuthUserDto`  
   (`provider`, `providerId`, `email`, `name`).

9. **req.user**  
   В `req.user` сохраняется `OAuthUserDto`.

10. **AuthController callback**  
    Вызывается запрос к сервису и бд:
    - если пользователь найден, то возвращаем его
    - если не найден - то создаем

    Далее генерируем токены и редиректим пользователя обратно на фронтенд
