import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/type-orm/entities/Company';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    controllers: [CompanyController],
    providers: [
        {
            provide: 'COMPANY_SERVICE',
            useClass: CompanyService
        }
    ]
})
export class CompanyModule {}