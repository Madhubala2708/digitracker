import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  message: '',
  hint: '',
  variant: 'info', // Default variant
  showToast: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.title = action.payload.title;   
      state.message = action.payload.message;     
      state.hint = action.payload.hint;    
      state.variant = action.payload.variant || 'info'; // Default to 'info'
      state.showToast = true;
    },
    hideToast: (state) => {
      state.title = '';   
      state.message = '';    
      state.hint = '';  
      state.variant = '';
      state.showToast = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice;