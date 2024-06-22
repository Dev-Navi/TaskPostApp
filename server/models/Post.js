import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const PostModal = mongoose.model("posts", PostSchema, "posts");

export default PostModal;
