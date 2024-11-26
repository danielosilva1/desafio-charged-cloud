/* Controla as requisições de usuário */

import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Rotas da API referentes aos usuários são implementadas aqui
    @Get("listar")
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}