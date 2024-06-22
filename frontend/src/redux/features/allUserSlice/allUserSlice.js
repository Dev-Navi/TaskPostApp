import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allUserGetAction } from "../../../actions/apiActions";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const allUserGet = createAsyncThunk("allUser", async () => {
  const { status, result } = await allUserGetAction();
  if (status) return result;
  else return initialState;
});

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(allUserGet.fulfilled, (state, action) => {
      state.users = action.payload;
      return state;
    });
  },
});

export default allUserSlice.reducer;
