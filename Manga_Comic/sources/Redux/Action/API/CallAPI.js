import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AxiosIntance from '../../../Utils/AxiosIntance';

// Tạo action với createAction
export const fetchMangaRequest = createAction('manga/FETCH_MANGA_REQUEST');
export const fetchMangaSuccess = createAction('manga/FETCH_MANGA_SUCCESS');
export const fetchMangaFailure = createAction('manga/FETCH_MANGA_FAILURE');

// Action thực hiện gọi API
export const fetchManga = (id) => {
  return async (dispatch) => {
    
    // Bắt đầu gọi API, dispatch action FETCH_MANGA_REQUEST để thông báo cho store
    dispatch(fetchMangaRequest());

    try {
      // Gọi API sử dụng Axios
      const response = await AxiosIntance().get(`api/manga/${id}`);
      // console.log("response", response);
      // Nếu API trả về thành công, dispatch action FETCH_MANGA_SUCCESS cùng với dữ liệu trả về
      dispatch(fetchMangaSuccess(response));
      // console.log(response);
    } catch (error) {
      // Nếu API trả về lỗi, dispatch action FETCH_MANGA_FAILURE cùng với thông tin lỗi
      console.log("error", error);
      dispatch(fetchMangaFailure(error.message));
    }
  };
};