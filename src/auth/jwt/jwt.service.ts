import { Injectable } from "@nestjs/common";

const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
    // Assina e retorna um token válido por 8 horas
    sign(payload) {
        return jwt.sign(payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '8h' }
        );
    }
}