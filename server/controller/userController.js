import PostModal from "../models/Post";
import UserModel from "../models/User";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { email, password, name, phone, role } = req.body;
    const emailCheck = await UserModel.findOne({ email: email });
    console.log(emailCheck, "emailCheck");
    if (emailCheck) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exits" });
    }
    let genSalt = 12;
    const passHash = await bcrypt.hash(password, genSalt);
    await UserModel.create({
      name,
      email,
      phone,
      password: passHash,
      UserRole: role,
    });
    return res
      .status(201)
      .json({ success: true, message: "Registration Completed" });
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCheck = await UserModel.findOne({ email: email });
    if (!userCheck) {
      return res
        .status(401)
        .json({ success: false, message: { email: "Email not Found" } });
    }
    const matchPass = await bcrypt.compare(password, userCheck.password);
    if (!matchPass) {
      return res
        .status(401)
        .json({ success: false, message: { password: "Password Incorrect" } });
    }
    let payload = {
      id: userCheck._id,
    };
    let token = await UserModel().generateToken(payload);
    return res.status(200).json({
      status: true,
      message: "LOGIN_SUCCESS",
      result: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const PostCreate = async (req, res) => {
  try {
    const { title, desc, image, date } = req.body;
    console.log(req.files, "eewewerewre");
    await PostModal.create({
      userId: req.user._id,
      title,
      desc,
      image: req.files,
      date,
    });

    // for (const file of req.files) {
    //   console.log(file.filename, "req.files.filename", req.user._id);
    //   await PostModal.findOneAndUpdate(
    //     { userId: req.user._id },
    //     { $push: { image: file.filename } },
    //     { new: true }
    //   );
    // }
    res.status(201).json({ success: true, message: "Post Created" });
  } catch (err) {
    console.log(err);
  }
};

export const PostEdit = async (req, res) => {
  try {
    const { title1, desc1, image1 } = req.body;
    console.log(req.user, req.body.id, "dsfdsfdsfdsfdf");
    const updfate = await PostModal.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: title1,
        // image: req.file.filename,
        desc: desc1,
      }
    );
    res.status(201).json({ success: true, message: "Post Edited" });
  } catch (err) {
    console.log(err);
  }
};

export const getMyPost = async (req, res) => {
  try {
    let ID = "";
    console.log(req.body.id, "req.body.ides");
    if (req.body.id) {
      ID = req.body.id;
    } else {
      ID = req.user._id;
    }
    const posts = await PostModal.find({ userId: ID });
    return res.status(200).json({
      success: true,
      message: "SUCCESS",
      result: posts,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userProfile = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: true, message: "SUCCESS", result: req.user });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SOMETHING_WRONG" });
  }
};

export const allUserGet = async (req, res) => {
  try {
    const users = await UserModel.find({ UserRole: { $ne: "Admin" } });
    console.log(users, "users");
    return res
      .status(200)
      .json({ status: true, message: "SUCCESS", result: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "SOMETHING_WRONG" });
  }
};
