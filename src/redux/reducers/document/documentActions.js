import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

export const fetchDocument = createAsyncThunk(
  "document/fetch",
  async (
    {
      credit_spec_report,
      committee_decision,
      all_contracts,
      scoring,
      id_client,
      id_entity,
    },
    { rejectWithValue }
  ) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("userToken"));

      const config = {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/crm/api/dataKK/`,
        {
          credit_spec_report,
          committee_decision,
          all_contracts,
          scoring,
          id_client,
          id_entity,
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
export const patchDocument = createAsyncThunk(
  "document/patch",
  async ({ obj, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.patch(
        `${BASE_URL}/crm/api/dataKK/${id}/`,
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
export const getDocuments = createAsyncThunk(
  "document/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${BASE_URL}/crm/api/dataKK/`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getDocument = createAsyncThunk(
  "document/getById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/crm/api/dataKK/${id}/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteDocument = createAsyncThunk(
  "document/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/crm/api/dataKK/${id}/`,
        {
          id,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
