import mongoose from "mongoose";
import UserRole from "./enum/role.enum";
import User from "./user.interface";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      unique: true,
      type: String,
    },
    rfid: {
      //   unique: true,
      type: String,
      default: "",
    },
    password: {
      type: String,
      get: (): undefined => undefined,
    },
    userRole: {
      type: String,
      enum: UserRole,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// userSchema.virtual('fullname').get(() => {
//     return `${this.firstName} ${this.lastName}`;
// });

const userModel = mongoose.model<User>("User", userSchema);

export default userModel;
