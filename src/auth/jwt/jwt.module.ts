import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './JwtStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/type-orm/entities/User';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [JwtService, JwtStrategy]
}) export class JwtModule {};