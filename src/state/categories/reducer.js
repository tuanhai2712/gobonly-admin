import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'categories';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
  total: null,
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    createCategories: (state) => ({
      ...state,
      loading: true
    }),
    createCategoriesFinish: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },

  },
});

export const reducer = slice.reducer;

export const { createCategories, createCategoriesFinish } = slice.actions;

export const categoriesSelector = (state) => state[namespace];
