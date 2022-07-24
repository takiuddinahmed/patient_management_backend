import HttpException from "../../exceptions/http.exception";
import Service from "../../interfaces/service";
import iotModel from "./iot.model";

class IotService implements Service {
  private iotModel = iotModel;

  public async getMsg() {
    try {
      return await this.iotModel.findByIdAndUpdate("62dcd31cd72a5fc65aa60d71", {
        message: "",
      });
    } catch (err) {
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
        "62dcd31cd72a5fc65aa60d71",
        {
          message: msg,
        },
        { new: true }
      );
    } catch (err) {
      throw new HttpException(500, "Server error");
    }
  }
}

export default IotService;
