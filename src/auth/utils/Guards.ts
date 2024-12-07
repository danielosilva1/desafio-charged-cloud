/* Permite a proteção de endpoints da aplicação */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Essa classe funciona como um middleware e se encarrega de realmente passar a solicitação para que possa realmente autenticar o usuário
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}