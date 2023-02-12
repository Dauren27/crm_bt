import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

export const userLogin = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/login/`,
        { email, password },
        config
      );
      sessionStorage.setItem("userToken", JSON.stringify(data));
      sessionStorage.setItem("isAuth", JSON.stringify(true));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateToken = createAsyncThunk(
  "refresh",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const refresh = JSON.parse(sessionStorage.getItem("userToken")).refresh;
      const { data } = await axios.post(
        `${BASE_URL}/token/refresh/`,
        { refresh },
        config
      );
      sessionStorage.setItem("userToken", JSON.stringify({ ...data, refresh }));
      return data;
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "registration/spec",
  async (
    {
      email,
      password,
      password_confirm,
      phone_number,
      full_name,
      occupation,
      spec,
      admin,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${BASE_URL}/register/spec/`,
        {
          email,
          password,
          password_confirm,
          phone_number,
          full_name,
          occupation,
          spec,
          admin,
        },
        config
      );
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerClient = createAsyncThunk(
  "registration/client",
  async (
    { email, password, password_confirm, phone_number, full_name, address },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${BASE_URL}/register/client/`,
        { email, password, password_confirm, phone_number, full_name, address },
        config
      );
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "getUserDetail",
  async (arg, { rejectWithValue }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("userToken"));
      const config = {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/full_name/`, config);
      return data;
    } catch (error) {
      if (error.response.status == 401) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
