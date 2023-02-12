import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActivity,
  getActivities,
  patchActivity,
} from "./activityActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  activitesInfo: null,
  activities: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActivity.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchActivity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.activitesInfo = payload;
      state.error = null;
      state.success = true;
    },
    [fetchActivity.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchActivity.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchActivity.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchActivity.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getActivities.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getActivities.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.activities = payload.results;
    },
    [getActivities.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default activitySlice.reducer;
