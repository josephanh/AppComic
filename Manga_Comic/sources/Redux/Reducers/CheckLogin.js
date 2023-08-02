import { createSlice } from "@reduxjs/toolkit";

const createReducerSlice = {
    isLogin: false,
    userInfo: {}
}

export const CheckLogin = createSlice({
    name: 'checkLogin',
    initialState: createReducerSlice,
    reducers: {
        add: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.userInfo = action.payload.userInfo;
            // console.log(state);
        }
    }
})

export const { add } = CheckLogin.actions;
export default CheckLogin.reducer;

// export const thisReducer = createReducer(createReducerSlice, ReducerCreate)