import {configureStore} from '@reduxjs/toolkit';
import stateReducer from '../slice/userSlice';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    users: stateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
