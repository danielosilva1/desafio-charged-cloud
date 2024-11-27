import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './type-orm/entities/User';
import { PassportModule } from '@nestjs/passport';
import { AddressModule } from './address/address.module';

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
			entities: [User],
			synchronize: true,
		}),
		PassportModule.register({ session: true }),
		AuthModule,
		AddressModule
	],
	controllers: [AuthController, AppController],
	providers: [AppService],
})
export class AppModule { }
