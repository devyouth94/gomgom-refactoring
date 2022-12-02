import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "app/module/instance";
import axios from "axios";
import { RoomItemProps } from "types";

export const __getRoomAll = createAsyncThunk("/getRoomAll", async (page: number, thunkAPI) => {
  try {
    const { data } = await instance.get(`/room?page=${page}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
    }
  }
});

export const __getRoomBySearch = createAsyncThunk(
  "/getRoomBySearch",
  async (query: string, thunkAPI) => {
    try {
      const { data } = await instance.get(`/room/search?searchWord=${query}`);
      return thunkAPI.fulfillWithValue({ data: data.result, query });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  },
);

interface State {
  data: {
    all: RoomItemProps[];
    entered: number[];
  };
  query: string;
  error: string | null;
}

const initialState: State = {
  data: {
    all: [],
    entered: [],
  },
  query: "",
  error: null,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    clearErrorRoom: (state) => {
      state.error = null;
    },

    clearQueryRoom: (state) => {
      state.data.all = [];
      state.query = "";
    },

    clearDataRoom: (state) => {
      state.data.all = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getRoomAll.fulfilled, (state, action: any) => {
      state.data.all = [...state.data.all, ...action.payload.result];
      state.data.entered = action.payload.isRoom;
    });
    builder.addCase(__getRoomAll.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    builder.addCase(__getRoomBySearch.fulfilled, (state, action: any) => {
      state.data.all = action.payload.data;
      state.query = action.payload.query;
    });
    builder.addCase(__getRoomBySearch.rejected, (state, action: any) => {
      state.error = action.payload;
    });
  },
});

export const { clearErrorRoom, clearQueryRoom, clearDataRoom } = roomSlice.actions;
export default roomSlice.reducer;
