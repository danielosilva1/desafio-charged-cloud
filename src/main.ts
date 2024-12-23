import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api'); // Define prefixo api para todos os endpoints
	app.enableCors({
		origin: process.env.FRONT_BASE_URL
	});
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
