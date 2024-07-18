import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createTag, deleteTag, getTags, updateTag } from "./tagActions";

let initialState = {};

const actions = [
  { api: getTags, name: "getTags" },
  { api: createTag, name: "createTag" },
  { api: updateTag, name: "updateTag" },
  { api: deleteTag, name: "deleteTag" },
];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const tagSlice = createSlice({
  name: "tagSlice",
  initialState,
  extraReducers: (builder) => {
    actions.forEach((cases) => {
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
  state.crm.tagSlice[actionName]?.loading;
const getDataState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.data;
  state.crm.tagSlice[actionName]?.data?.data;
export const crmtagSelector = createSelector(
  (state) => state,
  (state) => {
    let result = actions.reduce((acc, action) => {
      const loadingSelector = getLoadingState(action.name)(state);
      const dataSelector = getDataState(action.name)(state);

      acc[`${action.name}Loading`] = loadingSelector;
      acc[`${action.name}Data`] = dataSelector;

      return acc;
    }, {});

    return result;
  }
);
