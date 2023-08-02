import { createSlice } from "@reduxjs/toolkit";

const createReducerSlice = {
    list: [{
        a: true
    }]
}

export const Demo = createSlice({
    name: 'createReducer',
    initialState: createReducerSlice,
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload);
            console.log(action.payload);
        },
        del: (state, action) => {
            // TODO: implement delete logic
        }
    }
})

export const { add, del } = Demo.actions;
export default Demo.reducer;

// export const thisReducer = createReducer(createReducerSlice, ReducerCreate)