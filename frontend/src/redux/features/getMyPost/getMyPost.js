import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMystorePost } from "../../../actions/apiActions";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const getMyPost = createAsyncThunk("myPost", async (ides) => {
    console.log(ides,'Checkekkde');
    let payl = {
      id: ides,
    };
  const { status, result } = await getMystorePost(payl);
  if (status) return result;
  else return initialState;
});

const postSlice = createSlice({
  name: "myPost",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getMyPost.fulfilled, (state, action) => {
      state.posts = action.payload;
      return state;
    });
  },
});

export default postSlice.reducer;
