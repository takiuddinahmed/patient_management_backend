import { IsEmail, IsNotEmpty, IsString, ValidateIf ,MinLength, IsEnum} from "class-validator";
import UserRole from "../enum/role.enum";

export default class EditUserDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    @IsEmail()
    @ValidateIf((o,v)=>v!=null)
    email: string;

    @IsString()
    @MinLength(3)
    @ValidateIf((o,v)=>v!=null)
    public firstName: string;

    @IsString()
    @MinLength(3)
    @ValidateIf((o,v)=>v!=null)
    public lastName: string;

    @IsEnum(UserRole)
    @ValidateIf((o,v)=>v!=null)
    public userRole: UserRole;

    @IsString()
    @MinLength(3)
    @ValidateIf((o,v)=>v!=null)
    public rfid: string;

}