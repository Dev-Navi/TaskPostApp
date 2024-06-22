import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUSerData } from "../../../actions/apiActions";

const initialState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  status: "idle",
};

export const getUserProfile = createAsyncThunk("UserProfile", async () => {
  const { status, result } = await getUSerData();
  console.log(status, result, "status, result");
  if (status) return result;
  else return initialState;
});

const userSlice = createSlice({
  name: "UserProfile",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getUserProfile.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export default userSlice.reducer;
