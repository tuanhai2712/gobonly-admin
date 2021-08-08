import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'size';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    getSize: (state) => ({
      ...state,
      loading: true,
    }),
    getSizeFinish: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        data: data.data,
      };
    },
    createSize: (state) => ({
      ...state,
      loading: true,
    }),
    createSizeFinish: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const reducer = slice.reducer;

export const {
  getSize,
  getSizeFinish,
  createSize,
  createSizeFinish,
} = slice.actions;

export const sizeSelector = (state) => state[namespace];
