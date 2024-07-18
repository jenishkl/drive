import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET COMPANY
export const getCompany = createAsyncThunk(
  "getCompany",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/companyDetails`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//CREATE COMPANY
export const createCompany = createAsyncThunk(
  "createCompany",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/company/store`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET COMPANY
export const viewCompany = createAsyncThunk(
  "viewCompany",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/crm/company/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Update COMPANY
export const updateCompany = createAsyncThunk(
  "updateCompany",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/company/update/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Update COMPANY IMAGE
export const updateCompanyImage = createAsyncThunk(
  "updateCompanyImage",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.post(
        `/crm/lead/updateProfileImg`,
        {
          ...data,
          isClient: 0,
        },
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

//DELETE COMPANY
export const deleteCompany = createAsyncThunk(
  "deleteCompany",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.delete(`/crm/company/delete/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//COMPANY UPDATE TAG
export const companyUpdateTag = createAsyncThunk(
  "companyUpdateTag",
  async ({ data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/company/updateTag/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ADD MEMBER
export const addMember = createAsyncThunk(
  "addMember",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/company/addMember`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
