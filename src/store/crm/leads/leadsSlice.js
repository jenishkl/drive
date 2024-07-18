import { createSelector, createSlice } from "@reduxjs/toolkit";
import { convertClient, convertFormDatas, createLead, createSetup, getSetupList, getleads, leadUpdateTag, updateLeadImage, updatelead, viewlead } from "./leadsActions";

// const initialState = {
//   addPost: { data: [], isFetching: false, error: null },
//   addSchedulePost: { data: [], isFetching: false, error: null },
// };
let initialState = {};

const leads = [
  { api: getleads, name: "getleads" },
  { api: viewlead, name: "viewlead" },
  { api: updatelead, name: "updatelead" },
  { api: getSetupList, name: "getSetupList" },
  { api: createSetup, name: "createSetup" },
  { api: convertFormDatas, name: "convertFormDatas" },
  { api: convertClient, name: "convertClient" },
  { api: leadUpdateTag, name: "leadUpdateTag" },
  { api: updateLeadImage, name: "updateLeadImage" },
  { api: createLead, name: "createLead" },
];

leads.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const leadsSlice = createSlice({
  name: "leadsSlice",
  initialState,
  extraReducers: (builder) => {
    leads.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload ?? null;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          if (state[cases.name]?.data?.data?.[0]) {
            state[cases.name].loading = false;
          } else state[cases.name].loading = true;
          state[cases.name].error = null;
          //   state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
          state[cases.name].data = null;
        });
    });
  },
});




const getLoadingState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.loading;
  state.crm.leadsSlice[actionName]?.loading;
const getDataState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.data;
  state.crm.leadsSlice[actionName]?.data?.data;
export const crmLeadsSelector = createSelector(
  (state) => state,
  (state) => {
    let result = leads.reduce((acc, action) => {
      const loadingSelector = getLoadingState(action.name)(state);
      const dataSelector = getDataState(action.name)(state);

      acc[`${action.name}Loading`] = loadingSelector;
      acc[`${action.name}Data`] = dataSelector;

      return acc;
    }, {});

    return result;
  }
);
