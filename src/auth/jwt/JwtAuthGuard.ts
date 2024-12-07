import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Essa classe funciona como um middleware e as rotas que estão decoradas com JWTAuthGuard terão o token de acesso validado
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}