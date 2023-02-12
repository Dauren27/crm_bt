import { configureStore } from "@reduxjs/toolkit";
import {
  activitySlice,
  clientSlice,
  companySlice,
  conversationSlice,
  documentSlice,
  entitySlice,
  guarantorSlice,
  propertySlice,
  userSlice,
} from "./reducers";

const store = configureStore({
  reducer: {
    user: userSlice,
    client: clientSlice,
    guarantor: guarantorSlice,
    property: propertySlice,
    conversation: conversationSlice,
    entity: entitySlice,
    activity: activitySlice,
    company: companySlice,
    document: documentSlice,
  },
});

export default store;
