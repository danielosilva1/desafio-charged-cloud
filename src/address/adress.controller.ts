import { Controller, Get, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/type-orm/entities/Address';
import { Repository } from 'typeorm';
import { AddressService } from './adress.service';

@Controller('address')
export class AdressController {
    // Injeta dependência de AUTH_SERVICE para obter funções de manipulação dos endereços
    constructor(@Inject('ADDRESS_SERVICE') private readonly addressService: AddressService) {}

    @Post('create')
    createAddres(@Req() req: Request | any) {
        if (req.user) {
            console.log('Address Controller');
            console.log('Vou chamar a função do AddressService que cria novo endereço...');
            return;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });        
    }

    @Get('get')
    getAddresses(@Req() req: Request | any) {
        if (req.user) {
            console.log('Address Controller');
            console.log('Vou chamar a função do AddressService que retorna endereços...');
            this.addressService.getAddress();
            return;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }
}