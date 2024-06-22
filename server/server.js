import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "./config/config";
import userRoute from "./routes/userRoutes";
import passport from "passport";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());

require("./config/passport").UserAuth(passport);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/user", userRoute);

mongoose
  .connect(config.mongoURL)
  .then((res) => {
    console.log("DB Connected Done");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server Running 4000");
});
