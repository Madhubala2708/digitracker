import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  filterParam: {},
  showFilter: false,
};

const customerFilterSlice = createSlice({
  name: 'customerFilter',
  initialState,
  reducers: {
    filterData: (state, action) => {
      state.data = action.payload.data;
      state.filterParam = action.payload.filterParam;     
      state.showFilter = true;
    },
    resetFilter: (state) => {
      state.data = {};   
      state.filterParam = {};  
      state.showFilter = false;
    },
  },
});

export const { filterData, resetFilter } = customerFilterSlice.actions;
export default customerFilterSlice;