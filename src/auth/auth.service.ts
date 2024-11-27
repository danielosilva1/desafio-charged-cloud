import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/type-orm/entities/User";
import { userDetails } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    // Injeção de dependência para manipular usuários
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async validateUser(details: userDetails) {
        try {
            const user = await this.userRepository.findOneBy({ email: details.email });

            if (user) {
                // Usuário já cadastrado: atualiza seu nome
                user.name = details.name;
                const updatedUser = await this.userRepository.save(user);
                return updatedUser;
            }
            // Usuário não encontrado: cadastra usuário
            const newUser = this.userRepository.create(details);
            return this.userRepository.save(newUser);
        } catch {
            throw new InternalServerErrorException({msg: 'Ocorreu um erro ao processar requisição'});
        }
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }
}