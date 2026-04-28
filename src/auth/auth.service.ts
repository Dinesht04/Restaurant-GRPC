import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma/browser';
import { UsersService } from 'src/users/users.service';
import { SignUpReq } from './DTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly JWTService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      console.log(username, password);
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      username: user.name,
      role: user.role,
      country: user.country,
    };
    return {
      access_token: await this.JWTService.signAsync(payload),
    };
  }

  async signUp(data: SignUpReq): Promise<User | null> {
    return this.userService.Create(data);
  }
}
