import { createSlice } from "@reduxjs/toolkit";
import {
  deleteConversation,
  fetchConversation,
  getConversation,
  getConversations,
  patchConversation,
} from "./conversationActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: false,
  successModal: false,
  conversation: null,
  conversationInfo: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  conversations: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  patchMessage: false,
  patchConversation: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedConversation: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConversation.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [fetchConversation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.conversation = payload;
      state.successMessage = true;
      state.patchMessage = false;
      state.successModal = true;
      state.deleteSuccess = false;
    },
    [fetchConversation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [getConversations.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getConversations.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.conversations = payload.results;
      state.success = false;
      state.error = null;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [getConversations.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getConversation.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getConversation.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.conversationInfo = payload;
    },
    [getConversation.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [patchConversation.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchConversation.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
      state.patchConversation = payload;
      state.successMessage = false;
      state.patchMessage = true;
      state.deleteSuccess = false;
    },
    [patchConversation.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [deleteConversation.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteConversation.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deletedConversation = payload;
      state.deleteSuccess = true;
      state.successMessage = false;
      state.patchMessage = false;
    },
    [deleteConversation.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default conversationSlice.reducer;
