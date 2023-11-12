import { IsNumber, IsPositive, IsString, IsNotEmpty, IsEmail, IsStrongPassword} from "class-validator";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    //@IsStrongPassword()
    password: string;
}