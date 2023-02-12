import { createSlice } from "@reduxjs/toolkit";
import { deleteProperty, fetchProperties, getProperties, getProperty, patchProperty } from "./propertyActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successModal: false,
  successMessage: false,
  property:null,
  propertyInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchMessage: false,
  patchProperty: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  properties: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedProperty: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProperties.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchProperties.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.property = payload;
      state.successMessage = true;
      state.successModal = true;
      state.patchMessage = false;
      state.deleteSuccess = false;
    },
    [fetchProperties.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchProperty.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchProperty.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchProperty = payload;
      state.successMessage = false;
      state.patchMessage = true;
      state.deleteSuccess = false;
    },
    [patchProperty.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getProperties.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getProperties.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.properties = payload.results;
      state.success = false;
      state.error = null;
      state.patchSuccess = false;
      state.patchError = null;
    },
    [getProperties.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getProperty.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getProperty.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.propertyInfo = payload;
     
    },
    [getProperty.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteProperty.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteProperty.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteProperty.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default propertySlice.reducer;
