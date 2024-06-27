import { IsString, MinLength } from "class-validator";

class MessageDto{
    
    @IsString()
    @MinLength(1)
    message : string;
}