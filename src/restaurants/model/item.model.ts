import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Item{
    @Field(()=>ID)
    id: number

    @Field()
    name: string

    @Field()
    price: string
}