import { Body, Controller, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDetails } from 'src/utils/types';

@Controller('company')
export class CompanyController {
    // Injeta dependência para acessar funções do CompanyService
    constructor(@Inject('COMPANY_SERVICE') private readonly companyService: CompanyService) {}

    @Post('create')
    async createCompany(@Req() req: Request | any, @Body() company: CompanyDetails) {
        // if (req.user) {
        console.log('CompanyController');
        console.log('Vou chamar a função do CompanyService que cadastra empresa...');
        company = this.capitalizeTextualFields(company);

        this.companyService.createCompany(company);
        // }
        // throw new UnauthorizedException({ msg: 'User is not authenticated' });
    }

    capitalizeTextualFields(company: CompanyDetails) {
        company.name = company.name.toUpperCase();
        return company;
    }
}