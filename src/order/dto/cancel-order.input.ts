import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class cancelOrderInput{
    @Field()
    orderId: number
}