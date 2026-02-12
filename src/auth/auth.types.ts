import { OAuthUserDto } from "./dto/OAuthUserDto";

export interface OAuthRequest extends Request {
    user: OAuthUserDto;
}