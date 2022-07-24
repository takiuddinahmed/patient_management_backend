import { Document } from "mongoose";
import UserRole from "./enum/role.enum";

interface Iot extends Document {
  _id: string;
  message: string;
}
export default Iot;
