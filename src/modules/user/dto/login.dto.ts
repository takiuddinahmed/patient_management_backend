import { IsEmail, IsString, MinLength } from 'class-validator';

class LoginDto {
    @IsEmail()
    public email: string;

    @IsString()
    @MinLength(6)
    public password: string;
}

export default LoginDto;
