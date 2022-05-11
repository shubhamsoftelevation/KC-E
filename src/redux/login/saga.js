import {ActionConstants} from '../constants';
import {authError, authSuccess, profileError, profileSuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../store/api-client';
import {API_URL} from 'src/utils/config';
import {navigate} from 'src/routes/navigation-service';
import {RouteNames} from '_routeName';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/commonUtils';
const SaveData = async data => {
  return await AsyncStorage.setItem('user', JSON.stringify(data));
};
const SaveToken = async data => {
  return await AsyncStorage.setItem('token', data.token);
};

export function* request(action) {
  try {
    const response = yield call(
      apiCall,
      'POST',
      API_URL.lOGIN_URL,
      action.payload,
    ); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      if (dataResponse.role_id === 3) {
        onDisplayNotification(response.message);
        yield put(authSuccess(dataResponse));
        navigate(RouteNames.HOME_SCREEN);
        yield call(SaveToken, dataResponse);
        yield call(SaveData, dataResponse);
      } else {
        onDisplayNotification("Email and Password doesn't match");
        yield put(authError(response));
      }
    } else {
      onDisplayNotification(response.message);
      yield put(authError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(authError());
  }
}

export function* authWatcher() {
  yield all([takeLatest(ActionConstants.LOGIN_REQUEST, request)]);
}
export default authWatcher;
