import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET LEADS
export const getleads = createAsyncThunk(
  "getleads",
  async ({ params }, thunkAPI) => {
    try {
      let appId = 1;
      const res = await API.get(`/crm/lead/${appId}`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//View LEAD
export const viewlead = createAsyncThunk("viewlead", async (id, thunkAPI) => {
  try {
    const res = await API.get(`/crm/lead/view/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//CREATE LEAD

export const createLead = createAsyncThunk(
  "createLead",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/client/store`, {
        ...data,
        isClient: 0,
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Update LEAD
export const updatelead = createAsyncThunk(
  "updatelead",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/client/update/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Update LEAD IMAGE
export const updateLeadImage = createAsyncThunk(
  "updateLeadImage",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.post(
        `/crm/lead/updateProfileImg`,
        { ...data, id, isClient: 1 },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Setup account
export const getSetupList = createAsyncThunk(
  "getSetupList",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/lead/setup/list`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Setup account
export const createSetup = createAsyncThunk(
  "createSetup",
  async ({ data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/lead/setupAccount/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//convertFormDatas
export const convertFormDatas = createAsyncThunk(
  "convertFormDatas",
  async (data, thunkAPI) => {
    try {
      const res = await API.get(`/crm/commonSelect`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//convert clients
export const convertClient = createAsyncThunk(
  "convertClient",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/lead/convertClient`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//LEAD UPDATE TAG
export const leadUpdateTag = createAsyncThunk(
  "leadUpdateTag",
  async ({ data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/lead/updateTag/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
