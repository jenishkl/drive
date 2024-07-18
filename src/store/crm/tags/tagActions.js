import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET TAGS
export const getTags = createAsyncThunk(
    "getTags",
    async (params, thunkAPI) => {
      try {
        const res = await API.get(`/crm/tag`,{params});
        return res;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
// CREATE TAG
export const createTag = createAsyncThunk(
    "createTag",
    async (data, thunkAPI) => {
      try {
        const res = await API.post(`/crm/tag/store`,data);
        return res;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  
// UPDATE TAG
export const updateTag = createAsyncThunk(
    "updateTag",
    async ({data,id}, thunkAPI) => {
      try {
        const res = await API.put(`/crm/tag/update/${id}`,data);
        return res;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  
  
// DELETE TAG
export const deleteTag = createAsyncThunk(
    "deleteTag",
    async (id, thunkAPI) => {
      try {
        const res = await API.delete(`/crm/tag/delete/${id}`);
        return res;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
