import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApprovedProjectsByEmployee } from "../../services/inventoryAPI";

export const fetchProjectsByEmployee = createAsyncThunk(
  "inventory/fetchProjectsByEmployee",
  async (_, thunkAPI) => {
    try {
      const response = await getApprovedProjectsByEmployee();

      console.log("API Response:", response.data); 

      //return array directly
      return response.data || [];
    } catch (error) {
      console.error("API ERROR:", error);
      return thunkAPI.rejectWithValue("API Error");
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    projects: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsByEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectsByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload; //store array directly
      })
      .addCase(fetchProjectsByEmployee.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default inventorySlice.reducer;
