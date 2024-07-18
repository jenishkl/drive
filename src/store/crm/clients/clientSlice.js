import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getClientPermissions,
  clientUpdateTag,
  createClient,
  createClientType,
  deleteClient,
  deleteClientType,
  getClientTypes,
  getClients,
  updateClient,
  updateClientType,
  viewClient,
  createCard,
  defaultCardSet,
  listClientCards,
  deleteCard,
} from "./clientActions";

let initialState = {};

const actions = [
  { api: getClients, name: "getClients" },
  { api: viewClient, name: "viewClient" },
  { api: updateClient, name: "updateClient" },
  { api: createClient, name: "createClient" },
  { api: deleteClient, name: "deleteClient" },
  { api: clientUpdateTag, name: "clientUpdateTag" },
  { api: getClientPermissions, name: "getClientPermissions" },

  { api: getClientTypes, name: "getClientTypes" },
  { api: createClientType, name: "createClientType" },
  { api: updateClientType, name: "updateClientType" },
  { api: deleteClientType, name: "deleteClientType" },
  { api: createCard, name: "createCard" },
  { api: defaultCardSet, name: "defaultCardSet" },
  { api: listClientCards, name: "listClientCards" },
  { api: deleteCard, name: "deleteCard" },
];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  extraReducers: (builder) => {
    actions.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          // if (state[cases.name]?.data?.data?.[0]) {
          //   state[cases.name].loading = false;
          // }
          // else
          state[cases.name].loading = true;
          state[cases.name].error = null;
          //   state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
        });
    });
  },
});

const getLoadingState = (actionName) => (state) =>
  // get(state, `${module}.${sliceName}.${actionName}`)?.loading;
  state.crm.clientSlice[actionName]?.loading;
const getDataState = (actionName) => (state) => {
  // get(state, `${module}.${sliceName}.${actionName}`)?.data;
  if (["deleteClient", "updateClient"].includes(actionName)) {
    return state.crm.clientSlice[actionName]?.data;
  }
  return state.crm.clientSlice[actionName]?.data?.data;
};
export const crmClientSelector = createSelector(
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
