import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'USER',
  storage: AsyncStorage,
  whitelist: ['id', 'isLogin', 'email', 'fullname'],
};

const initialState = {
  fullname: '',
  id: '',
  email: '',
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    initApp: state => state,

    register: state => {
      state.loading = true;
    },
    registerSuccess: state => {
      state.loading = false;
    },
    registerFail: state => {
      state.loading = false;
    },

    login: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isLogin = true;
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.isLogin = false;
      state.loading = false;
    },

    logout: state => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      return { ...initialState };
    },
    logoutFail: state => {
      state.loading = false;
    },

    // refreshToken: state => {
    //   return {...state, loading: true};
    // },
    // refreshTokenSuccess: (state, action) => {
    //   return {...state, token: action.payload, isLogin: true, loading: false};
    // },
    // refreshTokenFail: () => {
    //   return {...initialState};
    // },
  },
});

export const {
  register,
  registerSuccess,
  registerFail,

  login,
  loginSuccess,
  loginFail,

  logout,
  logoutFail,
  logoutSuccess,

  refreshToken,
  refreshTokenSuccess,
  refreshTokenFail,

  initApp,
} = userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
