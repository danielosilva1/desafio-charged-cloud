import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/type-orm/entities/User";
import { userDetails } from "src/utils/types";
import { Repository } from "typeorm";
import { JwtService } from "./jwt/jwt.service";

@Injectable()
export class AuthService {
    // Injeção de dependência para manipular usuários e acessar função que gera JWT
    constructor(@Inject(JwtService) private readonly jwtService: JwtService, @InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async signIn(user: userDetails) {
        try {
            const userExists = await this.userRepository.findOneBy({ email: user.email });

            if (userExists) {
                // Usuário já cadastrado: atualiza seu nome
                userExists.name = user.name;

                const updatedUser = await this.userRepository.save(user);

                // Retorna token com nome e email do usuário como payload
                return this.jwtService.sign({ email: user.email, name: user.name});
            } else {
                // Usuário não encontrado: cadastra usuário
                const { name, email } = user;
                return await this.registerUser({ name, email });
            }
        } catch {
            throw new InternalServerErrorException({msg: 'Um erro interno ocorreu'});
        }
    }

    async registerUser(user: userDetails) {
        try {
            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);

            // Retorna token com dados do usuário como payload
            return this.jwtService.sign(user);
        } catch {
            throw new InternalServerErrorException();
        }
    }
}