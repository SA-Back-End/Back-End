import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  id(auth: string) {
    type userJWT = {
      id: number;
      username: string;
      iat: number;
      exp: number;
    };

    const jwt = auth.replace('Bearer ', '');
    const user = this.jwtService.decode(jwt) as userJWT;
    return { id: user.id, username: user.username };
  }
}
