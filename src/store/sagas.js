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

export function* initAppSaga() {
  const onAuthStateChanged = new Promise((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      if (user) resolve(user);
      else reject();
    });
  });

  try {
    const usersRef = firestore().collection('users');
    const user = yield onAuthStateChanged;

    const userData = yield usersRef.doc(user.uid).get();
    const { email, fullname } = userData.data();
    yield put(loginSuccess({ email, fullname, id: user.uid }));
  } catch (error) {
    // Alert.alert(
    //   'Fail',
    //   error,
    //   [
    //     {
    //       text: 'Ok',
    //       style: 'cancel',
    //     },
    //   ],
    //   { cancelable: false },
    // );
    yield put(logoutFail());
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
      appIdentifier: 'rn-android-universal-listings',
    };
    const user_uid = response.user.uid;
    yield firestore().collection('users').doc(user_uid).set(data);
    yield put(registerSuccess());
    RootNavigation.navigate('Login');
  } catch (error) {
    yield put(registerFail());
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
    console.log('response: ', response);

    const user = yield firestore().collection('users').doc(user_uid).get();
    const { email, fullname } = user.data();

    yield put(loginSuccess({ email, fullname, id: user.uid }));
    RootNavigation.navigate('Home');
  } catch (error) {
    yield put(loginFail());
    console.log('error: ', error);
  }
}

function* logoutSaga() {
  try {
    yield auth().signOut();
    yield put(logoutSuccess());
    // RootNavigation.navigate('Home');
  } catch (error) {
    yield put(logoutFail());
    console.log('error: ', error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(login, loginSaga),
    takeEvery(register, registerSaga),
    takeEvery(logout, logoutSaga),
    takeEvery(initApp, initAppSaga),
  ]);
}
