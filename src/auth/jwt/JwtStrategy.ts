import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/type-orm/entities/User";
import { JwtPayload } from "src/utils/types";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    // Injeta repositório para buscar usuário por email na hora de validar token
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

        // Função que irá extrair o JWT do cookie da requisição
        const extractJwtFromCookie = (req) => {
            let token = null;

            if (req && req.cookies) {
                // Obtém cookie passado na requisição
                token = req.cookies['access_token'];
            }

            if (!token) {
                // Token não foi passado por cookie: tenta extrair token passado no cabeçalho de autenticação Bearer
                token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
            }

            if (!token) {
                // Token realmente ausente: lança erro de não autorização
                throw new UnauthorizedException({msg: 'Usuário não autenticado'});
            }

            // Um token foi informado: retorna-o
            return token;
        }

        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: extractJwtFromCookie
        });
    }

    // Função valida token recebido na requisição
    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findOneBy({ email: payload.email });

        if (!user) {
            // Usuário não foi encontrado com base no nome presente no payload do cookie: requisição não autorizada
            throw new UnauthorizedException({msg: 'Usuário não autenticado'});
        }

        return payload;
    }
}