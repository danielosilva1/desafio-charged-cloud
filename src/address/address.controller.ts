import { Body, Controller, Get, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from 'src/type-orm/entities/Address';

@Controller('address')
export class AddressController {
    // Injeta dependência de AUTH_SERVICE para obter funções de manipulação dos endereços
    constructor(@Inject('ADDRESS_SERVICE') private readonly addressService: AddressService) {}

    @Post('create')
    async createAddress(@Req() req: Request | any, @Body() address: Address) {
        // Valida se usuário está autenticado
        if (req.user) {
            const newAdress = await this.addressService.createAddress(address);
            return newAdress;
        }
        throw new UnauthorizedException({ msg: 'Usuário não está autenticado' });
    }

    @Get('get-all')
    async getAddresses(@Req() req: Request | any) {
        // Valida se usuário está autenticado
        if (req.user) {
            const addresses = await this.addressService.getAllAddresses();
            return addresses;
        }
        throw new UnauthorizedException({ msg: 'Usuário não está autenticado' });
    }
}