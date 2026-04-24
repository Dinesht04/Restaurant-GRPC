import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatService } from './cats/cats.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CatsResolver } from './cats/cats.resolver';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/schema.gql')
    }),
    UsersModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService,CatService, CatsResolver, PrismaService, OrderService],
})
export class AppModule {}
