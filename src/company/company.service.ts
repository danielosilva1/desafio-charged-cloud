import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import { Address } from 'src/type-orm/entities/Address';
import { Company } from 'src/type-orm/entities/Company';
import { CompanyDetails } from 'src/utils/types';
import { Not, Repository } from 'typeorm';

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

    async getCompanies(cnpj: string | null, name: string | null) {
        try {
            // Consulta com base no SQL
            const companies = await this.companyRepository
            .createQueryBuilder('companie')
            .where(
                '(:cnpj IS NULL OR companie.cnpj LIKE :cnpjJoker) AND (:name IS NULL OR companie.name LIKE :nameJoker)',
                {cnpj: cnpj, cnpjJoker: `%${cnpj}%`, name: name, nameJoker: `%${name}%`}
            ).getMany();

            return companies;
        } catch {
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }

    async updateCompany(id: string, newDataCompany: CompanyDetails) {
        try {
            // Busca empresa pelo id
            const company = await this.companyRepository.findOneBy({ id: Number(id) });

            if (!company) {
                // Empresa não encontrada
                throw new NotFoundException({ msg: 'Company not found' });
            }

            // Verifica se o CNPJ recebido está cadastrado em outra empresa
            const cnpjExists = await this.companyRepository.findOne({
                where: [{
                    id: Not(Number(id)),
                    cnpj: newDataCompany.cnpj
                }]
            });

            if (cnpjExists)
                throw new ConflictException({ msg: 'CNPJ already exists' });

            // Valida novo endereço
            const address = await this.addressRepository.findOneBy({ id: newDataCompany.addressId });
            
            if (!address) {
                // Id do endereço não foi encontrado: informa erro
                throw new ConflictException({ msg: 'Address not found'} );
            }

            // Atualiza dados da empresa
            company.cnpj = newDataCompany.cnpj;
            company.name = newDataCompany.name;
            company.phoneNumber = newDataCompany.phoneNumber;
            company.address = address;
            
            // Salva alterações
            const updatedCompany = await this.companyRepository.save(company);
            return updatedCompany;
        } catch (error) {
            if (error.status == 404 || error.status == 409) {
                // Erros lançados na função
                throw error;
            }
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }

    async deleteCompany(id: string) {
        try {
            const deletedCompany = await this.companyRepository.delete({ id: Number(id) });
            return deletedCompany;
        } catch {
            throw new InternalServerErrorException({ msg: 'An internal error has occurred' });
        }
    }
}