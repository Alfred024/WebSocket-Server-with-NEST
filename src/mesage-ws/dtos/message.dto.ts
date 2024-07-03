import { IsNumber, IsString, MinLength } from "class-validator";

export class MessageDto{

    @IsNumber()
    clientId : number;

    @IsString()
    @MinLength(1)
    message : string;
}