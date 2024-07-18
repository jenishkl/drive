import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { USER } from "../../../helpers/utils";

//convertFormDatas
export const commonSelect = createAsyncThunk(
  "commonSelect",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/commonSelect`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//TRACK MAIL
export const trackMail = createAsyncThunk(
  "trackMail",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/trackMail`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//SEND MAIL
export const sendMail = createAsyncThunk("sendMail", async (data, thunkAPI) => {
  try {
    const res = await API.post(`/crm/sendMail`, data);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//MAIL LISTS
export const getMails = createAsyncThunk(
  "getMails",
  async ({ params }, thunkAPI) => {
    try {
      const res = await API.get(`/crm/mail/list`, {
        params,
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET NOTES
export const getNotes = createAsyncThunk(
  "getNotes",
  async ({ module_id, id }, thunkAPI) => {
    try {
      let res = "";
      if (id) res = await API.get(`/crm/note/${module_id}/${id}`);
      else res = await API.get(`/crm/note/${module_id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ADD NOTES
export const createNote = createAsyncThunk(
  "createNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/note/store`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//UPDATE NOTES
export const updateNote = createAsyncThunk(
  "updateNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/crm/note/update/${data?.id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DELETE NOTES
export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/crm/note/delete/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//REMIND NOTES
export const remindNote = createAsyncThunk(
  "remindNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/crm/note/reminder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GETCASES IN NOTE
export const getCasesInNotes = createAsyncThunk(
  "getCasesInNotes",
  async ({ module_id }, thunkAPI) => {
    try {
      let res = await API.get(`/crm/note/case/list/${module_id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getServices = createAsyncThunk(
  "getServices",
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

//getMessages

export const getAllMessages = createAsyncThunk(
  "getAllMessages",
  async ({ params }, thunkAPI) => {
    try {
      const res = await API.get(`/crm/getmsg`, { params });
      return res;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//sendMessages
export const sendCommonMsg = createAsyncThunk(
  "sendCommonMsg",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/sendmsg`, data);
      return res;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//NOTIFICATIONS
export const getNotifications = createAsyncThunk(
  "getNotifications",
  async (data, thunkAPI) => {
    try {
      const res = await API.get(`/dashboard/notification`);
      return res;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ASIGN CATEGORY BULK
export const asignCategory = createAsyncThunk(
  "asignCategory",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/asignCategory`, data);
      return res;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
