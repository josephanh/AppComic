import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import CheckLogin, { CheckFirstReducer, CheckLoginReducer, CheckSplashScreen, LoginReducer } from './Reducers/CheckLogin';
import ShowLogin from './Reducers/CheckShowLogin';
import Demo from './Reducers/Demo';
import GotoDetail from './Reducers/GotoDetail';
import mangaActions from './Reducers/CallAPI';



const rootReducer = combineReducers({
    login: CheckLogin,
    detailManga: GotoDetail,
    showLogin: ShowLogin,
    demo: Demo,
    manga: mangaActions,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

