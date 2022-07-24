import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  validate,
} from "class-validator";
import UserRole from "../enum/role.enum";

class RegisterDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @MinLength(3)
  public firstName: string;

  @IsString()
  @MinLength(3)
  public lastName: string;

  @IsEnum(UserRole)
  public userRole: UserRole;

  public rfid?: string;
}

export default RegisterDto;
