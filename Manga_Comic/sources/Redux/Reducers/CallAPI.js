import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mangaList: [],
  loading: false,
  error: null,
};

const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    FETCH_MANGA_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    FETCH_MANGA_SUCCESS: (state, action) => {
      // console.log(action.payload);
      state.mangaList = action.payload;
      state.loading = false;
    },
    FETCH_MANGA_FAILURE: (state, action) =>{
      state.loading = false;
      state.error = action.error.message;
    }
  },
});

export const { FETCH_MANGA_REQUEST, FETCH_MANGA_SUCCESS, FETCH_MANGA_FAILURE } = mangaSlice;
export default mangaSlice.reducer;