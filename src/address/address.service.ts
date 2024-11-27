import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, validateOrReject } from 'class-validator';
import { Address } from 'src/type-orm/entities/Address';
import { addressDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    // Injeta dependência para conseguir manipular tabela de endereços
    constructor(@InjectRepository(Address) private readonly addressRepositoy: Repository<Address>) {}

    async createAddress(address: addressDetails) {
        try {
            // Verifica se endereço já está cadastrado (com base em todas os campos)
            const addressExists = await this.addressRepositoy.findOne({
                where: {
                    cep: address.cep,
                    street: address.street,
                    neighborhood: address.neighborhood,
                    number: address.number,
                    additionalInfo: address.additionalInfo,
                    city: address.city,
                    state: address.state
                }
            });

            if (addressExists) {
                // Endereço existe, retorna exceção
                throw new ConflictException({ msg: 'Address already exists' });
            }

            // Endereço não existe: cadastra
            const newAddress = this.addressRepositoy.create(address);
            return this.addressRepositoy.save(newAddress);
        } catch (error) {
            if (error.status == 409) {
                // Recupera o erro lançado na função para informar que o endereço já existe
                throw new ConflictException({ msg: 'Address already exists' });
            }
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }

    async getAllAddresses() {
        try {
            const addresses = await this.addressRepositoy.find();
            return addresses;
        } catch {
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }
}