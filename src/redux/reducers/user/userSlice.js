import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  getUserDetail,
  updateToken,
} from "./userActions";

const userToken = sessionStorage.getItem("userToken");

const initialState = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
  isAuth: sessionStorage.getItem("isAuth") ? true : false,
  userToken,
  registerLoading: false,
  registerError: null,
  registerSuccess: false,
  userDetailError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("isAuth");
      state.isAuth = false;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.userToken;
      state.isAuth = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuth = false;
    },
    [updateToken.fulfilled]: (state, { payload }) => {
      state.userToken = payload;
    },
    [registerUser.pending]: (state) => {
      state.registerLoading = true;
      state.registerError = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerSuccess = true;
      state.error = null;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerError = payload;
      state.registerSuccess = false;
    },
    [getUserDetail.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.registerSuccess = false;
    },
    [getUserDetail.rejected]: (state, { payload }) => {
      state.userDetailError = true;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
