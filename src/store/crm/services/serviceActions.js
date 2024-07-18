import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET SERVICE
export const getServiceAndTypes = createAsyncThunk(
    "getServiceAndTypes",
    async (params, thunkAPI) => {
      try {
        const res = await API.get(`/crm/getServiceType`);
        return res;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
