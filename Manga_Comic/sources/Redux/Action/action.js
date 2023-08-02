import { createAction } from "@reduxjs/toolkit";

export const CheckFirst = value => {
    return {
        type: 'isFirst',
        payload: value
    }
};

export const CheckSplashScreen = value => {
    return {
        type: 'isSplashScreen',
        payload: value
    }
};

export const actionDemo = createAction('createReducer/add', value => {
    // console.log(value);
    return {
        type: 'add',
        payload: value,
    }
})

export const CheckLogin = createAction('checkLogin/add', value => {
    // console.log(value);
    return {
        type: 'add',
        payload: value,
    }
})

export const showLogin = createAction('checkShowLogin/add', value => {
    // console.log(value);
    return {
        type: 'add',
        payload: value,
    }
})
export const goToDetail = createAction('GoToDetailReducer/add', value => {
    // console.log(value);
    return {
        type: 'add',
        payload: value,
    }
})