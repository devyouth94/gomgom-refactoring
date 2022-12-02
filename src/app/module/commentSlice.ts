import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";
import { CommentItemProps } from "types";

export const __postComment = createAsyncThunk(
  "/postComment",
  async (payload: { selectKey: string | undefined; comment: string }, thunkAPI) => {
    try {
      const { data } = await instance.post(`/comment/${payload.selectKey}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __getComment = createAsyncThunk(
  "/getComment",
  async (selectKey: string | undefined, thunkAPI) => {
    try {
      const { data } = await instance.get(`/comment/${selectKey}`);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __editComment = createAsyncThunk(
  "/editComment",
  async (payload: { commentKey: number; comment: string }, thunkAPI) => {
    try {
      const { data } = await instance.put(`/comment/${payload.commentKey}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __deleteComment = createAsyncThunk(
  "/deleteComment",
  async (commentKey: number, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/comment/${commentKey}`);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __postRecomment = createAsyncThunk(
  "/postRecomment",
  async (payload: { commentKey: number; comment: string }, thunkAPI) => {
    try {
      const { data } = await instance.post(`/recomment/${payload.commentKey}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __editRecomment = createAsyncThunk(
  "/editRecomment",
  async (payload: { recommentKey: number; comment: string }, thunkAPI) => {
    try {
      const { data } = await instance.put(`/recomment/${payload.recommentKey}`, {
        comment: payload.comment,
      });
      console.log(data);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

export const __deleteRecomment = createAsyncThunk(
  "/deleteRecomment",
  async (recommentKey: number, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/recomment/${recommentKey}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

interface State {
  data: CommentItemProps[];
  error: string | null;
}

const initialState: State = {
  data: [],
  error: null,
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    clearErrorComment: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //댓글 POST
    builder.addCase(__postComment.fulfilled, (state, action: any) => {
      state.data = [...state.data, { ...action.payload, recomment: [] }];
    });
    builder.addCase(__postComment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //댓글 GET
    builder.addCase(__getComment.fulfilled, (state, action: any) => {
      state.data = action.payload;
    });
    builder.addCase(__getComment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //댓글 PATCH
    builder.addCase(__editComment.fulfilled, (state, action: any) => {
      state.data = state.data.map((item) =>
        item.commentKey === action.payload.commentKey ? action.payload : item,
      );
    });
    builder.addCase(__editComment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //댓글 DELETE
    builder.addCase(__deleteComment.fulfilled, (state, action: any) => {
      state.data = state.data.filter((item) => item.commentKey !== action.payload.commentKey);
    });
    builder.addCase(__deleteComment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //대댓글 POST
    builder.addCase(__postRecomment.fulfilled, (state, action: any) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? { ...item, recomment: [...item.recomment, action.payload] }
          : item,
      );
    });
    builder.addCase(__postRecomment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //대댓글 PATCH
    builder.addCase(__editRecomment.fulfilled, (state, action: any) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? {
              ...item,
              recomment: item.recomment.map((value) =>
                value.recommentKey === Number(action.payload.recommentKey) ? action.payload : value,
              ),
            }
          : item,
      );
    });
    builder.addCase(__editRecomment.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    //대댓글 DELETE
    builder.addCase(__deleteRecomment.fulfilled, (state, action: any) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? {
              ...item,
              recomment: item.recomment.filter(
                (value) => value.recommentKey !== Number(action.payload.recommentKey),
              ),
            }
          : item,
      );
    });
    builder.addCase(__deleteRecomment.rejected, (state, action: any) => {
      state.error = action.payload;
    });
  },
});

export const { clearErrorComment } = commentSlice.actions;
export default commentSlice.reducer;
