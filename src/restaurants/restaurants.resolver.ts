import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './model/restaurant.model';
import { OrderService } from 'src/order/order.service';
import { Order } from './model/order.model';
import { createOrderInput } from 'src/order/dto/create-order.input';
import { addToOrder } from 'src/order/dto/add-to-order.input';
import { checkoutInput } from 'src/order/dto/checkout-order.input';
import { cancelOrderInput } from 'src/order/dto/cancel-order.input';
import { ModifyPaymentMethodInput } from 'src/order/dto/modify-payment.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  createParamDecorator,
  UseGuards,
  ExecutionContext,
} from '@nestjs/common';
import { Country } from 'generated/prisma/enums';
import type Request from 'express';
import { ManagerGuard } from 'src/auth/guards/auth.manager.guard';
import { AdminGuard } from 'src/auth/guards/auth.admin.guard';

// export type Country = "india" | "us";

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [Restaurant])
  findAll(@Context('req') req: Request) {
    const country = req['user'].country as Country;
    return this.restaurantService.getAllRestaurants(country);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') data: createOrderInput,
    @Context('req') req: Request,
  ) {
    const country = req['user'].country as Country;
    return this.orderService.CreateOrder(data, country);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order)
  addItemToOrder(
    @Args('addOrderInput') data: addToOrder,
    @Context('req') req: Request,
  ) {
    const country = req['user'].country as Country;
    return this.orderService.addToOrder(data, country);
  }

  @UseGuards(ManagerGuard)
  @Mutation(() => Order)
  checkoutOrder(
    @Args('checkoutOrderInput') data: checkoutInput,
    @Context('req') req: Request,
  ) {
    const country = req['user'].country as Country;
    return this.orderService.checkout(data, country);
  }

  @UseGuards(ManagerGuard)
  @Mutation(() => Order)
  cancelOrder(
    @Args('cancelOrderInput') data: cancelOrderInput,
    @Context('req') req: Request,
  ) {
    const country = req['user'].country as Country;
    return this.orderService.cancelOrder(data, country);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Order)
  modifyPaymentMethod(
    @Args('modifyPaymentMethod') data: ModifyPaymentMethodInput,
    @Context('req') req: Request,
  ) {
    const country = req['user'].country as Country;
    return this.orderService.ModifyPaymentMethod(data, country);
  }
}
