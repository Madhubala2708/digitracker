import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;
// In your slice, modify the `uploadRiskData` to use FormData for file uploads.
export const uploadRiskData = createAsyncThunk(
  'risk/uploadRiskData',
  async (riskData, { rejectWithValue, getState }) => {
    try {
      // First, log the exact input data
      console.log("RISK DATA INPUT:", {
        riskId: riskData.riskId,
        category: riskData.category,
        status: riskData.status,
        projectId: riskData.projectId,
        filePresent: !!riskData.file,
        fileName: riskData.file?.name
      });

      // Get auth token
      const token = getState().auth.activeUser.data.accessToken;
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      // Validate fields
      if (!riskData.status || typeof riskData.status !== 'string' || riskData.status.trim() === "") {
        return rejectWithValue("Status is required and must be text.");
      }

      if (!riskData.category || typeof riskData.category !== 'string' || riskData.category.trim() === "") {
        return rejectWithValue("Category name is required and must be text.");
      }

      if (!riskData.file || !(riskData.file instanceof File)) {
        return rejectWithValue("File is required and must be a valid file.");
      }

      // Create FormData
      const formData = new FormData();
      formData.append('RiskId', riskData.riskId || 0);
      formData.append('CategoryName', riskData.category.trim());
      formData.append('Status', riskData.status.trim());
      formData.append('ProjectId', riskData.projectId);
      formData.append('UploadedFile', riskData.file); // Attach the file directly as FormData

      // Make the API request
      const response = await axios.post(
        `${BASE_URL}/api/Project/upsertRisk-single-upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Content-Type for FormData
          }
        }
      );

      console.log("API Response:", response.data);
      return { ...response.data, id: riskData.id };

    } catch (error) {
      // Detailed error logging
      console.error("API ERROR DETAILS:", {
        message: error.message,
        hasResponse: !!error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        hasRequest: !!error.request
      });

      if (error.response) {
        console.log("Server Error Response:", error.response.data);
      }
      
      return rejectWithValue(error.message || "Failed to upload risk data");
    }
  }
);

// Create the risk slice
const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    loading: null,
    error: null,
    uploadedRisks: [],
    successMessage: null
  },
  reducers: {
    clearRiskError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadRiskData.pending, (state, action) => {
        // Use meta.arg.id to store which risk is being uploaded
        state.loading = action.meta.arg.id;
        state.error = null;
      })
      .addCase(uploadRiskData.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.successMessage = "Risk data uploaded successfully";
        
        // Add the uploaded risk to the list if it's not already there
        if (!state.uploadedRisks.find(risk => risk.id === action.payload.id)) {
          state.uploadedRisks.push(action.payload);
        }
      })
      .addCase(uploadRiskData.rejected, (state, action) => {
        state.loading = null;
        state.error = action.payload || "Failed to upload risk data";
      });
  }
});

export const { clearRiskError, clearSuccessMessage } = riskSlice.actions;
export default riskSlice.reducer;
