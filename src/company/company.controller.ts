import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
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

    @Get('get')
    getCompanies(@Req() req: Request | any, @Query() params: any) {
        if (req.user) {
            const { cnpj, name } = params;
            const companies = this.companyService.getCompanies(cnpj, name);
            return companies;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }

    @Patch('update/:id')
    async updateCompany(@Req() req: Request | any, @Param('id') id: string, @Body() company: CompanyDetails) {
        if (req.user) {
            company = this.capitalizeTextualFields(company);
            const updatedCompany = await this.companyService.updateCompany(id, company);
            return updatedCompany;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }

    @Delete('delete/:id')
    async deleteCompany(@Req() req: Request | any, @Param('id') id: string) {
        if (req.user) {
            const deletedCompany = await this.companyService.deleteCompany(id);
            return deletedCompany;
        }
        throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }

    capitalizeTextualFields(company: CompanyDetails) {
        company.cnpj = company.cnpj.toUpperCase();
        company.name = company.name.toUpperCase();
        return company;
    }
}