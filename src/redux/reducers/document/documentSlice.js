import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDocument,
  fetchDocument,
  getDocument,
  getDocuments,
  patchDocument,
} from "./documentActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: false,
  document: null,
  documentInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchDocument: null,
  patchMessage: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  documentsList: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedDocument: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDocument.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchDocument.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.document = payload;
      state.success = true;
      state.successMessage = true;
      state.deleteSuccess = false;
      state.patchMessage = false;
    },
    [fetchDocument.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchDocument.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchDocument.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchDocument = payload;
      state.successMessage = false;
      state.deleteSuccess = false;
      state.patchMessage = true;
    },
    [patchDocument.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getDocuments.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getDocuments.fulfilled]: (state, { payload }) => {
      state.gerLoading = false;
      state.documentsList = payload;
      state.success = false;
      state.patchError = null;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [getDocuments.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteDocument.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [getDocument.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getDocument.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.documentInfo = payload;
    },
    [getDocument.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteDocument.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deletedDocument = payload;
      state.deleteSuccess = true;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteDocument.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default documentSlice.reducer;
