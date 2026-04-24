import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly JWTService: JwtService,
    ) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (user?.password !== password){
            console.log(username,password)
            throw new UnauthorizedException();
        } 
        const payload = { sub: user.id, username: user.name, role: user.role};
        return{
            access_token: await this.JWTService.signAsync(payload)
        };
    }

    async signUp(username: string, password: string, role: string): Promise<User|null>{
        return this.userService.Create(username,password,role);
    }
}
