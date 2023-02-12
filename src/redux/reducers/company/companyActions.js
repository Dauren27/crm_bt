import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

export const fetchCompany = createAsyncThunk(
  "company/post",
  async (
    {
      id,
      company_name,
      inn,
      legal_address,
      actual_address,
      telephone,
      okpo,
      register_number,
      field_activity,
      document,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/crm/api/company/`,
        {
          id,
          company_name,
          inn,
          legal_address,
          actual_address,
          telephone,
          okpo,
          register_number,
          field_activity,
          document,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const patchCompany = createAsyncThunk(
  "company/patch",
  async ({ obj, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.patch(
        `${BASE_URL}/crm/api/company/${id}/`,
        obj,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getCompanies = createAsyncThunk(
  "company/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${BASE_URL}/crm/api/company/`, config);

      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getCompany = createAsyncThunk(
  "company/getById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/crm/api/company/${id}/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/crm/api/company/${id}/`,
        {
          id,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
