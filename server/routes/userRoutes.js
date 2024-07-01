import express from "express";
import * as UserCnt from "../controller/userController";
import passport, { session } from "passport";
import multer from "multer";
const Router = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/postImg");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const passportAuth = passport.authenticate("userAuth", { session: false });

Router.route("/registration").post(UserCnt.Register);
Router.route("/login").post(UserCnt.Login);

Router.route("/post-create").post(
  upload.array("images"),
  passportAuth,
  UserCnt.PostCreate
);
Router.route("/post-edit").post(
  //   upload.single("image1"),
  passportAuth,
  UserCnt.PostEdit
);

Router.route("/getMyPost").post(passportAuth, UserCnt.getMyPost);
Router.route("/getUserData").get(passportAuth, UserCnt.userProfile);

Router.route("/allUserGetAction").get(passportAuth, UserCnt.allUserGet);

export default Router;
