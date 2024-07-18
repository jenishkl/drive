import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET Divisions
export const getDivisions = createAsyncThunk(
  "getDivisions",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/division`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//View Division
export const viewDivision = createAsyncThunk(
  "viewDivision",
  async ({ id, type, params }, thunkAPI) => {
    try {
      const res = await API.get(`/crm/division/${id}/${type}`, {
        params: params,
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//view CLient
export const viewClientDivision = createAsyncThunk(
  "viewClientDivision",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/crm/client/view/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//edit Divisions
export const editDivision = createAsyncThunk(
  "editDivision",
  async ({ data }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/division/update/${data?.id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Remove Divisions
export const removeDivision = createAsyncThunk(
  "removeDivision",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/crm/division/delete/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DIVISION ASIGN
export const divisionAsign = createAsyncThunk(
  "divisionAsign",
  async ({ person, data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/division/bulkAssign${person}/${id}`, {
        [person == "employees" ? "employee_id" : "client_id"]: data?.map(
          (it) => it.client_id
        ),
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DIVISION UN ASIGN
export const divisionUnAsign = createAsyncThunk(
  "divisionUnAsign",
  async ({ person, data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/division/bulkUnAssign${person}/${id}`, {
        [person == "employees" ? "employee_id" : "client_id"]: data?.map(
          (it) => it.client_id
        ),
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ADD Division
export const addDivision = createAsyncThunk(
  "addDivision",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/division/store`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//CHANAGE STATUS
export const changeDivisionStatus = createAsyncThunk(
  "changeDivisionStatus",
  async ({ id, is_active }, thunkAPI) => {
    try {
      const res = await API.put(
        `/crm/division/changeStatus/${is_active}/${id}`
      );
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET ACTIVITY BT DIVISION

export const getActivityByDivision = createAsyncThunk(
  "getActivityByDivision",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/crm/division/activity/list/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//VIEW EMPLOYEE DIVISION

export const viewEmployeeDivision = createAsyncThunk(
  "viewEmployeeDivision",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/settings/employee/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
