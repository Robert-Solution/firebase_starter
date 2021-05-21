import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import {
  register,
  registerFail,
  registerSuccess,
  loginSuccess,
  loginFail,
  login,
  logout,
  logoutSuccess,
  logoutFail,
  initApp,
} from './reducer';
import * as RootNavigation from '../navigation/RootNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const handleAlert = (title, message) => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};

export function* authenticationChecking() {
  const user = auth().currentUser;
  console.log('user: ', user);
  if (user) {
    try {
      const usersRef = firestore().collection('users');
      const userData = yield usersRef.doc(user.uid).get();
      const { email, fullname } = userData.data();
      yield put(loginSuccess({ email, fullname, id: user.uid }));
    } catch (error) {
      handleAlert(error);
    }
  } else {
    yield put(loginFail());
  }
}

function* registerSaga({ payload }) {
  const { fullname, password, email } = payload;
  try {
    const response = yield auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const data = {
      email: email,
      fullname: fullname,
      password,
    };
    const user_uid = response.user.uid;
    yield firestore().collection('users').doc(user_uid).set(data);
    yield response.user.sendEmailVerification();
    yield put(registerSuccess());
    RootNavigation.navigate('Login');
  } catch (error) {
    yield put(registerFail());
    handleAlert(error.name, error.message);
  }
}

function* loginSaga({ payload }) {
  const { password } = payload;
  try {
    const response = yield auth().signInWithEmailAndPassword(
      payload.email,
      password,
    );
    const user_uid = response.user.uid;

    const user = yield firestore().collection('users').doc(user_uid).get();
    const { email, fullname } = user.data();

    yield put(loginSuccess({ email, fullname, id: user.uid }));
    RootNavigation.navigate('Home');
  } catch (error) {
    yield put(loginFail());
    handleAlert(error.name, error.message);
  }
}

function* logoutSaga() {
  try {
    yield auth().signOut();
    yield put(logoutSuccess());
    // RootNavigation.navigate('Home');
  } catch (error) {
    yield put(logoutFail());
    handleAlert(error.name, error.message);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(login, loginSaga),
    takeEvery(register, registerSaga),
    takeEvery(logout, logoutSaga),
    takeEvery(initApp, authenticationChecking),
  ]);
}
