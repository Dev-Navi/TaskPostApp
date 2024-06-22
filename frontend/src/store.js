import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/features/auth/authSlice";
import postSlice from "./redux/features/getMyPost/getMyPost";
import userSlice from "./redux/features/userSlice/userSlice";
import allUserSlice from "./redux/features/allUserSlice/allUserSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    user: userSlice,
    allUser: allUserSlice,
  },
});

export default store;
