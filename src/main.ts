import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api'); // Define prefixo api para todos os endpoints
	// Habilita sessão (salva autenticação do usuário por determinado tempo)
	app.use(session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000 // 24 horas em milissegundos
		}
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
