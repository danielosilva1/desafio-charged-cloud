import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/type-orm/entities/Address';
import { AddressService } from './adress.service';
import { AdressController } from './adress.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    controllers: [AdressController],
    providers: [
        {
            provide: 'ADDRESS_SERVICE',
            useClass: AddressService
        }
    ]
})
export class AddressModule {};