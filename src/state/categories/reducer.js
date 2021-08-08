import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'categories';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    getCategories: (state) => ({
      ...state,
      loading: true,
    }),
    getCategoriesFinish: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        data: data.data,
      };
    },
    createCategories: (state) => ({
      ...state,
      loading: true,
    }),
    createCategoriesFinish: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    updateCategory: (state) => ({
      ...state,
      loading: true,
    }),
    updateCategoryFinish: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const reducer = slice.reducer;

export const {
  getCategories,
  getCategoriesFinish,
  createCategories,
  createCategoriesFinish,
  updateCategory,
  updateCategoryFinish,
} = slice.actions;

export const categoriesSelector = (state) => state[namespace];
