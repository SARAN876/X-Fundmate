import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loading',
  initialState: {
    loading1: false,
    loading2: false,
    loading3: false
  },
  reducers: {
    startLoading1: (state) => {
      state.loading1 = true;
    },
    clearLoading1: (state) => {
      state.loading1 = false;
    },
    startLoading2: (state) => {
      state.loading2 = true;
    },
    clearLoading2: (state) => {
      state.loading2 = false;
    },
    startLoading3: (state) => {
      state.loading3 = true;
    },
    clearLoading3: (state) => {
      state.loading3 = false;
    }
  }
});

export const {
  startLoading1,
  clearLoading1,
  startLoading2,
  clearLoading2,
  startLoading3,
  clearLoading3
} = loaderSlice.actions;

export default loaderSlice.reducer;
