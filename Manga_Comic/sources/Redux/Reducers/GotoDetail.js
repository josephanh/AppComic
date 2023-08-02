import { createSlice } from "@reduxjs/toolkit";

const stateBegin = {
    data: {}
}
export const GoToDetail = createSlice({
    name: 'GoToDetailReducer',
    initialState: stateBegin,
    reducers: {
        add: (state, action) => {
            state.data = action.payload;
            // console.log(state);
        },
    }
})

export const { add, del } = GoToDetail.actions;
export default GoToDetail.reducer;