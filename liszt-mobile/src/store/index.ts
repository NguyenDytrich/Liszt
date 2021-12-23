import {AnyAction} from 'redux';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {UserActions} from './UserSlice';

const userState = {
  profile: {
    displayName: '',
    name: '',
    instruments: '',
    pronouns: '',
  },
};

const userReducer = (state = userState, action: AnyAction) => {
  switch (action.type) {
    // Replace the profile state entirely
    case UserActions.SET_PROFILE:
      return action.payload;
    // Update the local profile state (does not sync to server);
    case UserActions.UPDATE_PROFILE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
