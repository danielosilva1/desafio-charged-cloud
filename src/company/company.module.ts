import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/type-orm/entities/Company';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Address } from 'src/type-orm/entities/Address';

@Module({
    imports: [TypeOrmModule.forFeature([Company, Address])],
    controllers: [CompanyController],
    providers: [
        {
            provide: 'COMPANY_SERVICE',
            useClass: CompanyService
        }
    ]
})
export class CompanyModule {}