import { createSlice } from "@reduxjs/toolkit";
import { getServiceAndTypes } from "./serviceActions";

let initialState = {};

const actions = [
    { api: getServiceAndTypes, name: "getServiceAndTypes" },

];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const serviceSlice = createSlice({
  name: "serviceSlice",
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
