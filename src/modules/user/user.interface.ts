import { Document } from "mongoose";
import UserRole from "./enum/role.enum";

interface User extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  userRole: UserRole;
  rfid?: string;
}
export default User;
