import App from "./app";
import connectDb from "./config/mongoose";
import dotenv from "dotenv";
import UserModule from "./modules/user/user.module";
import IotModule from "./modules/iot/iot.module";

dotenv.config();

const port = process.env.PORT || 3500;

connectDb();

const app = new App([new UserModule(), new IotModule()]);

app.listen();
