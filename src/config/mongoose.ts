import { connect, connection } from "mongoose";

async function connectDb() {
  try {
    const uri = process.env.MONGO_URL || "";
    await connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.log({ err, msg: "database connection error" });
  }
}

connection.on("error", (err) => {
  console.error(err);
});

connection.on("connecting", () => {
  console.log("connecting to database");
});
connection.on("connected", () => {
  console.log("connected to database");
});
connection.on("disconnecting", () => {
  console.log("diconnecting to database");
});
connection.on("disconnected", () => {
  console.log("diconnected to database");
});

export default connectDb;
