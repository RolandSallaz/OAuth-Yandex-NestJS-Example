import { ConfigType, registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv'
dotenv.config();


export const yandexConfig = registerAs('YANDEX_CONFIG', () => ({
    clientID: process.env.CLIENT_ID || 'айди',
    clientSecret: process.env.CLIENT_SECRET || 'ключ',
    callbackURL: process.env.CALLBACK_URL || 'где принимаем данные'
}))

export type TYandexConfig = ConfigType<typeof yandexConfig>