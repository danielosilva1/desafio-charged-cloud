import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './type-orm/entities/User';
import { PassportModule } from '@nestjs/passport';
import { Address } from './type-orm/entities/Address';
import { Company } from './type-orm/entities/Company';

@Module({
	imports: [
		ConfigModule.forRoot(), // Torna as variáveis de ambiente acessíveis
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [User, Address, Company ],
			synchronize: true,
		}),
		PassportModule.register({ session: true }),
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
