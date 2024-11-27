import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/type-orm/entities/Address';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    controllers: [AddressController],
    providers: [
        {
            provide: 'ADDRESS_SERVICE',
            useClass: AddressService
        }
    ]
})
export class AddressModule {};