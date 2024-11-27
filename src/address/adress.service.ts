import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/type-orm/entities/Address';

@Injectable()
export class AddressService {
    async createAddress(newAddress) {
        console.log('AddressService');
        console.log('Vou criar um novo endereço com os seguintes dados:');
        console.log(newAddress);
    }

    async getAddress() {
        console.log('AddressService');
        console.log('Vou retornar os endereços...');
    }
}