import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Menu } from "./menu.model";


@ObjectType()
export class Restaurant{
    @Field(()=> ID)
    id: number;

    @Field()
    name: string;

    @Field(()=>[Menu])
    Menus : Menu[];
}