import auth from '@react-native-firebase/auth';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';

export enum UserActions {
  SET_PROFILE = 'users/setProfile',
  UPDATE_PROFILE = 'users/updateProfile',
}

export const fetchProfile = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  try {
    return async dispatch => {
      const token = await auth().currentUser?.getIdToken();
      const res = await fetch('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      return dispatch({
        type: UserActions.SET_PROFILE,
        payload: json,
      });
    };
  } catch (e) {
    return (dispatch, getState) => {
      return dispatch({
        type: UserActions.SET_PROFILE,
        payload: getState().user,
      });
    };
  }
};

export const syncProfile = (
  onComplete: () => void,
  onErr: () => void,
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const {user} = getState();
    const jwt = await auth().currentUser?.getIdToken();
    const res = await fetch('http://localhost:5000/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: auth().currentUser?.uid,
        displayName: user.displayName,
        name: user.name,
        pronouns: user.pronouns,
        instruments: user.instruments,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      dispatch({
        type: UserActions.UPDATE_PROFILE,
        payload: json,
      });
      onComplete();
    } else {
      onErr();
    }
  };
};
