import { Field, InputType } from "@nestjs/graphql";
import { Item } from "../../restaurants/model/item.model";
import { PaymentMethod } from "../../restaurants/model/order.model";


@InputType()
export class createOrderInput{
    @Field()
    restaurantId: number

    @Field(type => PaymentMethod)
    paymentMethod: PaymentMethod

}