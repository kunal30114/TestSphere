import {configureStore} from '@reduxjs/toolkit';
import teacherReducer from '../slices/teacherSlice.js';

export const store = configureStore({
    reducer: teacherReducer
})