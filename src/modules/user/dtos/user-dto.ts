import { PartialType } from "@nestjs/mapped-types";
import { RegisterUserDto } from "./register-user-dto";
import { Exclude } from "class-transformer";

export class UserDto extends PartialType(RegisterUserDto){
    id: string;

    @Exclude()
    password?: string;
}