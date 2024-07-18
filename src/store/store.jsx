import { configureStore } from "@reduxjs/toolkit";

import crm from "./crm/crmreducer";

import driveSlice from "./drive/driveSlice";

const store = configureStore({
  reducer: {
    crm: crm,
    drive: driveSlice,
  },
});

export default store;
