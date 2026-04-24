import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addToOrder } from '../order/dto/add-to-order.input';
import { createOrderInput } from '../order/dto/create-order.input';

type Item = {
  id:    number
  name:  string
  price: number

}

type Menu = {
  id : number;
  items:        Item[];
  restaurantId : number;
}

type restaurants = {
  id:     number
  name:   string
  Menus:  Menu[]
}


@Injectable()
export class RestaurantsService {
    constructor(private prismaService: PrismaService){}

    getAllRestaurants(){
        return this.prismaService.restaurant.findMany({
            select: {
                id: true,
                name: true,
                Menus: true
            }
        });
    }

    

}
