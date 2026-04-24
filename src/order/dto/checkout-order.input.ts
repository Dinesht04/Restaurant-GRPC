import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class checkoutInput{
    @Field()
    orderId: number
}