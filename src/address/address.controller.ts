import { Body, Controller, Get, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from 'src/type-orm/entities/Address';

@Controller('address')
export class AddressController {
    // Injeta dependência de AUTH_SERVICE para obter funções de manipulação dos endereços
    constructor(@Inject('ADDRESS_SERVICE') private readonly addressService: AddressService) {}

    @Post('create')
    async createAddres(@Req() req: Request | any, @Body() address: Address) {
        // Valida se usuário está autenticadp
        if (req.user) {
            const newAdress = await this.addressService.createAddress(address);
            return newAdress;
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