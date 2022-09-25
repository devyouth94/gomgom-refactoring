import { configureStore } from '@reduxjs/toolkit';
import select from '../module/selectSlice';
import vote from '../module/voteSlice';
import commentSlice from '../module/commentSlice';
import myPageSlice from '../module/myPageSlice';

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    myPageSlice: myPageSlice.reducer,
    select,
    vote,
  },

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
