import { Body, Controller, Get, Inject, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDetails } from 'src/utils/types';

@Controller('company')
export class CompanyController {
    // Injeta dependência para acessar funções do CompanyService
    constructor(@Inject('COMPANY_SERVICE') private readonly companyService: CompanyService) {}

    @Post('create')
    async createCompany(@Req() req: Request | any, @Body() company: CompanyDetails) {
        if (req.user) {
            company = this.capitalizeTextualFields(company);

            const newCompany = await this.companyService.createCompany(company);
            return newCompany;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }

    capitalizeTextualFields(company: CompanyDetails) {
        company.cnpj = company.cnpj.toUpperCase();
        company.name = company.name.toUpperCase();
        return company;
    }

    @Get('get')
    getCompanies(@Req() req: Request, @Query() params: any) {
        const { cnpj, name } = params;
        const companies = this.companyService.getCompanies(cnpj, name);
        return companies;
    }
}