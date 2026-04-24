import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class addToOrder{
    @Field()
    orderId: number;

    @Field()
    itemId: number;
}