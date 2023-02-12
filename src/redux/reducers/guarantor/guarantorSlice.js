import { createSlice } from "@reduxjs/toolkit";
import {
  deleteGuarantor,
  fetchGuarantors,
  getGuarantor,
  getGuarantors,
  patchGuarantor,
} from "./guarantorActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successModal: false,
  successMessage: false,
  recipient: null,
  recipientInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchMessage: false,
  patchRecipient: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  guarantors: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedRecipient: null,
};

const guarantorSlice = createSlice({
  name: "guarantors",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGuarantors.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchGuarantors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.recipient = payload;
      state.successMessage = true;
      state.successModal = true;
      state.patchMessage = false;
      state.deleteSuccess = false;
    },
    [fetchGuarantors.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [patchGuarantor.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchGuarantor.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchRecipient = payload;
      state.successMessage = false;
      state.patchMessage = true;
      state.deleteSuccess = false;
    },
    [patchGuarantor.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getGuarantor.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getGuarantor.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.recipientInfo = payload;
    },
    [getGuarantor.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
      state.getLoading = false;
    },
    [getGuarantors.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getGuarantors.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.guarantors = payload.results;
      state.success = false;
      state.patchError = null;
      state.error = null;
      state.patchSuccess = false;
    },
    [getGuarantors.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteGuarantor.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteGuarantor.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteGuarantor.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default guarantorSlice.reducer;
