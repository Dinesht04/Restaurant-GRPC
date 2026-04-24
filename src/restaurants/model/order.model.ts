import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Item } from "./item.model"


export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  UPI = "UPI"
}

@ObjectType()
export class Order{
    @Field(()=>ID)
    id: number;

    @Field(()=>[Item])
    Items: Item[];

    @Field()
    restaurantId: number;

    @Field()
    cost: number;

    @Field()
    completed: boolean;

    @Field(type => PaymentMethod)
    paymentMethod: PaymentMethod

}