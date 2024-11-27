import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/type-orm/entities/User";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super();
    }

    // Sempre que usuário faz login, ele é serializado em uma sessão
    serializeUser(user: User, done: Function) {
        done(null, user);
    }

    // Usado para restaurar a sessão: pega a sessão e descobre a quem ela pertence
    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUser(payload.id);
        
        return user ? done(null, user) : done(null, null);
    }
}