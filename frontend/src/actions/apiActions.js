import axios from "./axios";
import config from "../config/config";
import { setAuth } from "../redux/features/auth/authSlice";

export const registerAction = async (data) => {
  try {
    let respData = await axios({
      method: "POST",
      url: `api/user/registration`,
      data,
    });

    return {
      loading: true,
      result: respData.data?.result,
      status: respData.data.success,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};

export const LoginUser = async (data, dispatch) => {
  try {
    let respData = await axios({
      method: "post",
      url: `api/user/login`,
      data,
    });
    dispatch(setAuth(true));
    return {
      loading: true,
      result: respData.data.result,
      message: respData.data.message,
      status: respData.data.success,
      //   error: respData.data.errors,
    };
  } catch (err) {
    console.log(err);
  }
};

export const PostCreate = async (data) => {
  try {
    console.log(data, "datadatadata");
    let respData = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      url: `api/user/post-create`,
      data: data,
    });

    return {
      status: respData.data.success,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};

export const PostEdit = async (data) => {
  try {
    console.log(data, "datadatadata");
    let respData = await axios({
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
      method: "POST",
      url: `api/user/post-edit`,
      data: data,
    });

    return {
      status: respData.data.success,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getMystorePost = async (data) => {
  try {
    console.log(data,'dennaaa');
    let respData = await axios({
      method: "post",
      url: `/api/user/getMyPost`,
      data,
    });
    return {
      status: respData.data.success,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getUSerData = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `/api/user/getUserData`,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};

export const allUserGetAction = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `/api/user/allUserGetAction`,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};
