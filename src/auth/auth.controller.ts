import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
    constructor() {}
    
    // Define rota api/aut/google/login do tipo GET
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        // Função lida com o login do usuário
        return { msg: 'Google Authentication' };
    }

    // Define rota para a tela de login do Google (para onde usuário será redirecionado quando acessar api/auth/google/login). google/direct foi definido na Google Cloud
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: 'OK' };
    }

    @Get('status')
    user(@Req() req: Request | any) {
        // Ao serializar a sessão, o objeto de usuário é anexado à requisição
        // Sempre que uma rota é acessa a sessão é desserializada (logo, a cada rota verifica-se se usuário está ou não autenticado)
        if (req.user) {
            // Sessão foi desserializada e objeto do usuário foi encontrado: usuário está logado
            return {msg: 'Autenticado'};
        }
        // Sessão foi desserializada e objeto do usuário não foi encontrado: usuário não está logado
        return {msg: 'Não autenticado'};
    }

    @Get('logout')
    handleLogout(@Req() req: Request | any) {
        if (req.user) {
            // Destrói a sessão ativa do usuário autenticado
            req.session.destroy();
            return { msg: 'Logout realizado com sucesso' };
        }
        return { msg: 'Usuário não estava logado' }
    }
}