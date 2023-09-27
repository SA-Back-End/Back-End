/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(login: string, pass: string) {
    const user = await this.userService.findUserLogin(login);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const payload = { id: user.id_user, username: user.username };
      return await this.jwtService.signAsync(payload);
    } else {
      throw new UnauthorizedException('Senha incorreta');
    }
  }
}
