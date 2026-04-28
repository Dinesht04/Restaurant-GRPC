import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addToOrder } from './dto/add-to-order.input';
import { createOrderInput } from './dto/create-order.input';
import { checkoutInput } from './dto/checkout-order.input';
import { cancelOrderInput } from './dto/cancel-order.input';
import { ModifyPaymentMethodInput } from './dto/modify-payment.input';
import { Country } from 'generated/prisma/enums';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async CreateOrder(data: createOrderInput, country: Country) {
    return this.prismaService.order.create({
      data: {
        ...data,
        country: country,
      },
      include: {
        items: true,
      },
    });
  }

  async addToOrder(data: addToOrder, country: Country) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: data.orderId,
        country: country,
      },
    });
    if (!order) {
      throw new BadRequestException('This order doesnt exist in this region');
    }

    if (order.completed === true) {
      throw new BadRequestException('Order has already been fulfilled');
    }

    const item = await this.prismaService.item.findUnique({
      where: {
        id: data.itemId,
      },
    });
    if (!item) {
      throw new BadRequestException('Inavlid Item Id');
    }

    const updatedOrder = await this.prismaService.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        items: {
          connect: { id: data.itemId },
        },
        cost: order.cost + item.price,
      },
      include: {
        items: true,
      },
    });

    return updatedOrder;
  }

  async checkout(data: checkoutInput, country: Country) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: data.orderId,
        },
      });
      if (!order) {
        throw new BadRequestException('This order doesnt exist');
      }

      if (order.country !== country) {
        throw new BadRequestException('This order doesnt exist in this region');
      }

      if (order.completed === true) {
        throw new BadRequestException('Order has already been fulfilled');
      }

      const checkout = await this.prismaService.order.update({
        where: {
          id: data.orderId,
          country: country,
        },
        data: {
          completed: true,
        },
        include: {
          items: true,
        },
      });
      console.log(checkout);
      return checkout;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async cancelOrder(data: cancelOrderInput, country: Country) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: data.orderId,
        },
      });
      if (!order) {
        throw new BadRequestException('This order doesnt exist');
      }

      if (order.country !== country) {
        throw new BadRequestException('This order doesnt exist in this region');
      }

      if (order.completed === true) {
        throw new BadRequestException('Order has already been fulfilled');
      }

      return await this.prismaService.order.delete({
        where: {
          id: data.orderId,
          country: country,
        },
        include: {
          items: true,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async ModifyPaymentMethod(data: ModifyPaymentMethodInput, country: Country) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: data.orderId,
        },
      });
      if (!order) {
        throw new BadRequestException('This order doesnt exist');
      }

      if (order.country !== country) {
        throw new BadRequestException('This order doesnt exist in this region');
      }

      if (order.completed === true) {
        throw new BadRequestException('Order has already been fulfilled');
      }

      return await this.prismaService.order.update({
        where: {
          id: data.orderId,
          country: country,
        },
        data: {
          paymentMethod: data.paymentMethod,
        },
        include: {
          items: true,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
