import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEntity,
  getEntities,
  getEntity,
  patchEntity,
  fetchEntity
} from "./entityActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: false,
  successModal: false,
  entity: null,
  entityInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchMessage: false,
  patchEntity: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  entities: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedEntity: null,
};

const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEntity.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchEntity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.entity = payload;
      state.successMessage = true;
      state.patchMessage = false;
      state.deleteSuccess = false;
      state.successModal = false;
    },
    [fetchEntity.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchEntity.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchEntity.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchEntity = payload;
      state.successMessage = false;
      state.patchMessage = true;
      state.deleteSuccess = false;
    },
    [patchEntity.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getEntities.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getEntities.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.entities = payload.results;
      state.success = false;
      state.error = null;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [getEntities.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getEntity.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getEntity.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.entityInfo = payload;
      state.getError = null;
    },
    [getEntity.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteEntity.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteEntity.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.deletedEntity = payload;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteEntity.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default entitySlice.reducer;
