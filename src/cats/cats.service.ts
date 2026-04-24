import { Injectable } from "@nestjs/common";
import { Cat } from "./model/cat.model";
import { CreateCatInput } from "./dto/create-cat.input";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class CatService {
    constructor(private prisma: PrismaService){}

    private readonly cats: Cat[] = [];

    create(createCatInput: CreateCatInput){
        return this.prisma.cat.create({data: createCatInput})
    }

    findAll() {
        return this.prisma.cat.findMany({})
    }

}