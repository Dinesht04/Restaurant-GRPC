import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = {
    id: number,
      name: string ,
      password: string ,
      role: string
}

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService ){}


    async Create(name: string, password: string, role: string): Promise<User|null>{
        const User = {
            name: name,
            password: password,
            role: role
        }
        return await this.prismaService.user.create({data: User})
    }

    async findOne(username : string) : Promise<User|null>{
        return await this.prismaService.user.findUnique({
            where: {
                name : username
            }
        })
    } 
}
