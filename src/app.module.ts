import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Torna as variáveis de ambiente acessíveis
    UserModule,
    AuthModule
  ],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}
