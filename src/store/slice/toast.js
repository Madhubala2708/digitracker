import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  message: '',
  hint: '',
  variant: 'info',
  showToast: false,
};

const cleanError = (err) => {
  if (!err) return "Unexpected error";

  if (err.response?.data?.message)
    return err.response.data.message;

  if (err.response?.data?.error)
    return err.response.data.error;

  if (typeof err === "string") return err;

  if (err.message) return err.message;

  return "Something went wrong";
};


const cleanMessage = (msg) => {
  if (!msg) return 'Something went wrong';

  if (typeof msg === 'string') return msg;

  // If backend sent object → convert safely
  if (msg.message) return msg.message;
  if (msg.error) return msg.error;

  try {
    return JSON.stringify(msg);
  } catch (e) {
    return 'Unexpected error';
  }
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.title = action.payload.title || '';

      state.message = cleanMessage(action.payload.message);

      state.hint = action.payload.hint || '';
      state.variant = action.payload.variant || 'info';
      state.showToast = true;
    },
    hideToast: (state) => {
      state.title = '';
      state.message = '';
      state.hint = '';
      state.variant = 'info';
      state.showToast = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice;
