import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCompany,
  fetchCompany,
  getCompany,
  getCompanies,
  patchCompany,
} from "./companyActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: false,
  successModal: false,
  company: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  companies: null,
  patchLoading: false,
  patchError: null,
  patchCompany: null,
  patchSuccess: false,
  patchMessage: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedCompany: null,
  companyInfo: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
        state.success = true;
        state.error = null;
        state.successMessage = true;
        state.successModal = true;
        state.patchMessage = false;
        state.deleteSuccess = false;
        state.patchError = false;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(patchCompany.pending, (state, action) => {
        state.patchLoading = true;
        state.patchError = null;
        state.patchSuccess = false;
      })
      .addCase(patchCompany.fulfilled, (state, action) => {
        state.patchLoading = false;
        state.patchSuccess = true;
        state.patchError = null;
        state.patchCompany = action.payload;
        state.patchMessage = true;
        state.successMessage = false;
        state.deleteSuccess = false;
      })
      .addCase(patchCompany.rejected, (state, action) => {
        state.patchLoading = false;
        state.patchError = action.payload;
        state.patchSuccess = false;
      })
      .addCase(getCompanies.pending, (state, action) => {
        state.getLoading = true;
        state.getError = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.getLoading = false;
        state.companies = action.payload.results;
        state.success = false;
        state.loading = false;
        state.error = null;
        state.patchSuccess = false;
        state.patchError = null;
        state.companyInfo = null;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.getLoading = false;
        state.getError = action.payload;
      })
      .addCase(getCompany.pending, (state, action) => {
        state.getLoading = true;
        state.getError = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.getLoading = false;
        state.companyInfo = action.payload;
        state.patchError = false;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.getLoading = false;
        state.getError = action.payload;
      })
      .addCase(deleteCompany.pending, (state, action) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.deleteError = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.successMessage = false;
        state.deletedCompany = action.payload;
        state.patchMessage = false;
        state.deleteError = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
        state.deleteSuccess = false;
      });
  },
});
export default companySlice.reducer;
