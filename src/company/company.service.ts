import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/type-orm/entities/Company';
import { CompanyDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    // Injeta repositório para manipular empresas do banco de dados
    constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>) {}

    async createCompany(company: CompanyDetails) {
        console.log('CompanyService');
        console.log('Vou cadastrar empresa com os seguintes dados:');
        console.log(company);
    }

    async getCompanies() {
        console.log('CompanyService');
        console.log('Vou cadastrar empresa com os seguintes dados:');
    }
}