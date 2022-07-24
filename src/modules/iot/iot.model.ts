import mongoose from "mongoose";
import UserRole from "./enum/role.enum";
import User from "./iot.interface";

const IotSchema = new mongoose.Schema(
  {
    message: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// userSchema.virtual('fullname').get(() => {
//     return `${this.firstName} ${this.lastName}`;
// });

const iotModel = mongoose.model<User>("iot", IotSchema);

export default iotModel;
