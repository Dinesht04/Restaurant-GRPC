import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        const url = process.env.DATABASE_URL;
        
        if (!url) {
            throw new Error("DATABASE_URL is not defined in the environment variables");
        }
        const adapter = new  PrismaBetterSqlite3({url: process.env.DATABASE_URL})
        super({adapter})
    }
}
