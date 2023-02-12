import { createSlice } from "@reduxjs/toolkit";
import {
  deleteClient,
  fetchClient,
  getClient,
  getClients,
  patchClient,
} from "./clientActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: false,
  successModal: false,
  clientInfo: null,
  client: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchMessage: false,
  patchClient: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  clients: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedClient: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClient.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchClient.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.successMessage = true;
      state.client = payload;
      state.patchMessage = false;
      state.deleteSuccess = false;
      state.successModal = true;
    },
    [fetchClient.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchClient.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchClient.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchClient = payload;
      state.successMessage = false;
      state.patchMessage = true;
      state.deleteSuccess = false;
    },
    [patchClient.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getClients.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getClients.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.clients = payload.results;
      state.success = false;
      state.error = null;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [getClients.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getClient.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getClient.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.clientInfo = payload;
    },
    [getClient.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteClient.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteClient.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deletedClient = payload;
      state.deleteSuccess = true;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteClient.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default clientSlice.reducer;
