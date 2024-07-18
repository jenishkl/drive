import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET Employees
export const getEmployees = createAsyncThunk(
  "getEmployees",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/employee/1`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET ALL Employees
export const getAllEmployees = createAsyncThunk(
  "getAllEmployees",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/settings/employee`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//view Employee
export const viewEmployee = createAsyncThunk(
  "viewEmployee",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/crm/employee/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Update Employee
export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/crm/employee/update`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
