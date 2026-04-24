import { Field, InputType } from "@nestjs/graphql";
import { PaymentMethod } from "src/restaurants/model/order.model";

@InputType()
export class ModifyPaymentMethodInput{
    @Field()
    orderId: number

    @Field(type => PaymentMethod)
    paymentMethod: PaymentMethod
}