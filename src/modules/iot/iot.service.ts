import HttpException from "../../exceptions/http.exception";
import Service from "../../interfaces/service";
import userModel from "../user/user.model";
import iotModel from "./iot.model";

class IotService implements Service {
  private iotModel = iotModel;
  private userModel = userModel;

  public async getMsg() {
    try {
      const cardId = await this.iotModel.findById("62dd77c9b4b0526d572afa97");
      const user = await this.userModel.findOne({ cardId: cardId?.message });
      if (user) {
        return user;
      } else {
        return {
          cardId: cardId?.message,
          error: true,
        };
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(500, "Server error");
    }
  }

  public async addMsg(msg: string) {
    try {
      return await this.iotModel.create({ message: msg });
    } catch (err) {
      throw new HttpException(500, "Server error");
    }
  }

  public async updateMsg(msg: string) {
    try {
      return await this.iotModel.findByIdAndUpdate(
        "62dd77c9b4b0526d572afa97",
        {
          message: msg,
        },
        { new: true }
      );
    } catch (err) {
      throw new HttpException(500, "Server error");
    }
  }

  public async deleteMsg() {
    try {
      return await this.iotModel.findByIdAndUpdate("62dd77c9b4b0526d572afa97", {
        message: "",
      });
    } catch (err) {
      throw new HttpException(500, "Server error");
    }
  }
}

export default IotService;
