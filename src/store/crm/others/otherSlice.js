import { createSelector, createSlice } from "@reduxjs/toolkit";
import { asignCategory, commonSelect, createNote, deleteNote, getAllMessages, getCasesInNotes, getMails, getNotes, getNotifications, getServices, remindNote, sendCommonMsg, sendMail, trackMail, updateNote } from "./otherActions";

let initialState = {};

const actions = [
  { api: commonSelect, name: "commonSelect" },

//MAIL
  { api: trackMail, name: "trackMail" },
  { api: sendMail, name: "sendMail" },
  { api: getMails, name: "getMails" },
  //NOTES
  { api: getNotes, name: "getNotes" },
  { api: createNote, name: "createNote" },
  { api: updateNote, name: "updateNote" },
  { api: deleteNote, name: "deleteNote" },
  { api: remindNote, name: "remindNote" },
  { api: getCasesInNotes, name: "getCasesInNotes" },

  { api: getServices, name: "getServices" },


  { api: sendCommonMsg, name: "sendCommonMsg" },
  { api: getAllMessages, name: "getAllMessages" },
  { api: getNotifications, name: "getNotifications" },

  { api: asignCategory, name: "asignCategory" },



];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const otherSlice = createSlice({
  name: "otherSlice",
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
  state.crm.otherSlice[actionName]?.loading;
const getDataState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.data;
  state.crm.otherSlice[actionName]?.data?.data;
export const crmOtherSelector = createSelector(
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
