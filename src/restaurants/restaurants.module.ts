import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { OrderService } from 'src/order/order.service';
import { RestaurantsResolver } from './restaurants.resolver';

@Module({
  imports: [OrderService],
  providers: [RestaurantsService, RestaurantsResolver],
  controllers: [RestaurantsController]
})
export class RestaurantsModule {}
