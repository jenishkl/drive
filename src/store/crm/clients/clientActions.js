import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

//GET CLients
export const getClients = createAsyncThunk(
  "getClients",
  async ({ params } = {}, thunkAPI) => {
    try {
      const res = await API.get(`/crm/client/1`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//view CLient
export const viewClient = createAsyncThunk(
  "viewClient",
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

//Update CLients
export const updateClient = createAsyncThunk(
  "updateClient",
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

//CLIENT UPDATE TAG
export const clientUpdateTag = createAsyncThunk(
  "clientUpdateTag",
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

//CREATE CLIENT
export const createClient = createAsyncThunk(
  "createClient",
  async ({ data }, thunkAPI) => {
    try {
      const res = await API.post(`/crm/client/store`, {
        ...data,
        isClient: 1,
        app_id: 1,
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET CLIENT TYPES
export const getClientTypes = createAsyncThunk(
  "getClientTypes",
  async (params, thunkAPI) => {
    try {
      const res = await API.get(`/crm/clientType`,{params});
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// CREATE CLIENT TYPE
export const createClientType = createAsyncThunk(
  "createClientType",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/clientType/store`, {
        ...data,
        is_client: 1,
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// UPDATE CLIENT TYPE
export const updateClientType = createAsyncThunk(
  "updateClientType",
  async ({ data, id }, thunkAPI) => {
    try {
      const res = await API.put(`/crm/clientType/update/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DELETE CLIENT
export const deleteClient = createAsyncThunk(
  "deleteClient",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.delete(`/crm/lead/delete/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// DELETE CLIENT TYPE
export const deleteClientType = createAsyncThunk(
  "deleteClientType",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/crm/clientType/delete/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//CLIENT MODULES
export const getClientPermissions = createAsyncThunk(
  "getClientPermissions",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/crm/modules/client`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ADD MEMBER

//CREATE CARD
export const createCard = createAsyncThunk(
  "createCard",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/crm/createCard`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//SET DEFAULT CARD
export const defaultCardSet = createAsyncThunk(
  "defaultCardSet",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/client/paymentGateway/defaultCardSet`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//SET DEFAULT CARD
export const listClientCards = createAsyncThunk(
  "listClientCards",
  async ({ params }, thunkAPI) => {
    try {
      const res = await API.get(
        `/client/paymentGateway/listSavedCards`,
        {
          params,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DELETE CARD
export const deleteCard = createAsyncThunk(
  "deleteCard",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/client/paymentGateway/deleteCard`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
