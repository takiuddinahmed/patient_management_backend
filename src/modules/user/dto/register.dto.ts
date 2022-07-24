import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  validate,
  ValidateIf,
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

  @IsString()
  @ValidateIf((object, value) => value !== null)
  public cardId?: string;
}

export default RegisterDto;
