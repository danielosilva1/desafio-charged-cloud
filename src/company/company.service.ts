import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/type-orm/entities/Address';
import { Company } from 'src/type-orm/entities/Company';
import { CompanyDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    // Injeta repositórios para manipular empresas e endereços do banco de dados
    constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>, @InjectRepository(Address) private readonly addressRepository: Repository<Address>) {}

    async createCompany(company: CompanyDetails) {
        try {
            // Verifica se CNPJ já está cadastrado
            const companyExists = await this.companyRepository.findOne({ where: { cnpj: company.cnpj }});

            if (companyExists) {
                throw new ConflictException('Company already exists');
            }

            // Empresa ainda não cadastrada: realiza cadastro
            const newCompany = this.companyRepository.create(company);
            const address = await this.addressRepository.findOneBy({ id: company.addressId });
            
            if (!address) {
                // Id do endereço não foi encontrado: informa erro
                throw new ConflictException('Address not found');
            }

            // Adiciona endereço da empresa
            newCompany.address = address;
            
            return this.companyRepository.save(newCompany);
        } catch (error) {
            if (error.status == 409) {
                // Recupera o erro lançado na função para informar que a empresa já existe
                throw new ConflictException({ msg: error.message });
            }
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }

    async getCompanies(cnpj, name) {
        // Parâmetros, quando não informados, vêm como undefined. Para a consulta SQL funcionar, seta como NULL
        if (!cnpj) {
            cnpj = null;
        }
        if (!name) {
            name = null;
        }

        // Consulta com base no SQL
        const companies = await this.companyRepository
        .createQueryBuilder('companie')
        .where(
            '(:cnpj IS NULL OR companie.cnpj LIKE :cnpjJoker) AND (:name IS NULL OR companie.name LIKE :nameJoker)',
            {cnpj: cnpj, cnpjJoker: `%${cnpj}%`, name: name, nameJoker: `%${name}%`}
        ).getMany();

        return companies;
    }
}