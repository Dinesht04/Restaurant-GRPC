import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Item } from "./item.model"

@ObjectType()
export class Menu{
    @Field(()=>ID)
    id: number

    @Field()
    restaurantId: string

    @Field(() => [Item])
    Items: Item[];
}