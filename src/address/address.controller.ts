import { Body, Controller, Get, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AddressService } from './address.service';
import { addressDetails } from 'src/utils/types';

@Controller('address')
export class AddressController {
    // Injeta dependência de AUTH_SERVICE para obter funções de manipulação dos endereços
    constructor(@Inject('ADDRESS_SERVICE') private readonly addressService: AddressService) {}

    @Post('create')
    async createAddress(@Req() req: Request | any, @Body() address: addressDetails) {
        // Valida se usuário está autenticado
        address = this.capitalizeTextualFields(address);
        const newAdress = await this.addressService.createAddress(address);
        return newAdress;
    }

    @Get('get-all')
    async getAddresses(@Req() req: Request | any) {
        // Valida se usuário está autenticado
        const addresses = await this.addressService.getAllAddresses();
        return addresses;
    }

    capitalizeTextualFields(address: addressDetails) {
        address.street = address.street.toUpperCase();
        address.neighborhood = address.neighborhood.toUpperCase();
        address.additionalInfo = address.additionalInfo.toUpperCase();
        address.city = address.city.toUpperCase();
        address.state = address.state.toUpperCase();
        return address;
    }
}