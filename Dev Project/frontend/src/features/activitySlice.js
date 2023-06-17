import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createActivity } from "../Api/dashboard";
import axios from "axios";
import {notification} from "antd";
const handleNotification = (value, message, success) => {
  notification[value]({
    message: success,
    description: message,
    placement: "topRight",
  });
};
// Create Activity
export const createUserActivity = createAsyncThunk(
  "createUserActivity",
  async (data, { rejectWithValue }) => {
    try {
      //   const response = await createActivity(data);
      const response = await axios.post(
        "http://localhost:5000/api/v1/exercise/save",
        data
      );
      if (response.data.status === 200) {
        let message = response.data.msg;
        let success = response.data.success;
        handleNotification("success", message, success);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Get Activity Pagination
export const getUserActivity = createAsyncThunk(
  "getUserActivity",
  async (args, { rejectWithValue }) => {
    const {page,limit} = args;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/exercise/activityPage?page=${page}&limit=${limit}`
      );
      //   return response;
      const { headers, data } = response;
    return data.result.getActivity;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Get Activity
export const AllUserActivity = createAsyncThunk(
    "AllUserActivity",
    async (args, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/exercise/`
        );
        //   return response;
        const { headers, data } = response;
      return data.result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
// update Activity
export const updateUserActivity = createAsyncThunk(
    "updateUserActivity",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/exercise/${data._id}`,
          data
        );
        if (response.data.status === 200) {
          let message = response.data.msg;
          let success = response.data.success;
          handleNotification("success", message, success);
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);
// delete Activity
export const deleteUserActivity = createAsyncThunk(
  "deleteUserActivity",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/exercise/${id}`
      );
      
      if (response.data.status === 200) {
        let message = response.data.msg;
        let success = response.data.success;
        handleNotification("success", message, success);
        const { headers, data } = response;
      const serializedHeaders = { ...headers }; // Extract serializable data from headers
      return { headers: serializedHeaders, data }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const activityDetail = createSlice({
  name: "activityDetail",
  initialState: {
    activity: [],
    allActivity:[],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity.push(action.payload);
      })
      .addCase(createUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload;
      })
      .addCase(getUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        // state.activity = action.payload;
        const {_id} =action.payload.data.result;
        if (_id) {
            state.activity = state.activity.filter((ele) => ele.id !== _id);
          }
      })
      .addCase(deleteUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity =state.users.map((elem)=>{
            elem._id == action.payload._id ? action.payload : elem
        })
      })
      .addCase(updateUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AllUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.allActivity = action.payload;
      })
      .addCase(AllUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default activityDetail.reducer;
