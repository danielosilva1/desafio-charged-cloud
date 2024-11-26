import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Torna as variáveis de ambiente acessíveis
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
