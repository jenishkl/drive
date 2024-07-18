import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addDivision,
  changeDivisionStatus,
  divisionAsign,
  divisionUnAsign,
  editDivision,
  getActivityByDivision,
  getDivisions,
  removeDivision,
  viewClientDivision,
  viewDivision,
  viewEmployeeDivision,
} from "./divisionActions";

let initialState = {};

const actions = [
  { api: getDivisions, name: "getDivisions" },
  { api: addDivision, name: "addDivision" },
  { api: viewDivision, name: "viewDivision" },
  { api: removeDivision, name: "removeDivision" },
  { api: editDivision, name: "editDivision" },
  { api: divisionUnAsign, name: "divisionUnAsign" },
  { api: divisionAsign, name: "divisionAsign" },
  { api: changeDivisionStatus, name: "changeDivisionStatus" },
  { api: getActivityByDivision, name: "getActivityByDivision" },
  { api: viewClientDivision, name: "viewClientDivision" },
  { api: viewEmployeeDivision, name: "viewEmployeeDivision" },
];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});
// actions.forEach((api) => {
//   initialState[api.name] = {
//     loading: false,
//     data: null,
//     error: null,
//   };
// });

// const getDivisionsState = (state) => state.crm.divisionSlice.getDivisions;
// const getRemoveDivisionState = (state) => state.crm.divisionSlice.removeDivision;

// const getDivisions = createSelector(
//   getDivisionsState,
//   (divisionsState) => divisionsState.data?.data
// );

export const divisionSlice = createSlice({
  name: "divisionSlice",
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
          console.log(cases);
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
  state.crm.divisionSlice[actionName]?.loading;
const getDataState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.data;
  state.crm.divisionSlice[actionName]?.data?.data;
export const crmDivisionSelector = createSelector(
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