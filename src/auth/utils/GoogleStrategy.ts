/* Define as propriedades do oAuth Client */

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        // Injeta dependência para que possa chamar as funções do AuthService
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    }

    // Método será invocado logo após o usuário se autenticar com sucesso
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const user = await this.authService.validateUser({ email: profile._json.email, name: profile._json.name });
        return user || null;
    }
}