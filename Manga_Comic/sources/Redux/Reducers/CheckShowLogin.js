import { createSlice } from "@reduxjs/toolkit";

const createReducerSlice = {
    showLogin: false
}

export const ShowLogin = createSlice({
    name: 'checkShowLogin',
    initialState: createReducerSlice,
    reducers: {
        add: (state, action) => {
            state.showLogin = action.payload.showLogin;
            console.log(action.payload);
        }
    }
})

export const { add } = ShowLogin.actions;
export default ShowLogin.reducer;

// export const thisReducer = createReducer(createReducerSlice, ReducerCreate)