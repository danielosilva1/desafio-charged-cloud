import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/type-orm/entities/User';
import { JwtService } from './jwt/jwt.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [GoogleStrategy,
        AuthService,
        JwtService
    ]
})
export class AuthModule {}