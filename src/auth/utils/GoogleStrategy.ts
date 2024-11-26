/* Define as propriedades do oAuth Client */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    }

    // Método será invocado logo após o usuário se autenticar com sucesso
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    }
}