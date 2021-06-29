import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'review';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
  total: null
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        loading: false,
        data: [],
      }
    },
    getReview: (state) => ({
      ...state,
      loading: true,
    }),
    getReviewFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          loading: false,

        };
      return {
        ...state,
        data: data.data,
        total: data.total,
        loading: false,
      };
    },

  },
});

export const reducer = slice.reducer;

export const {
  reset,
  getReview,
  getReviewFinish
} = slice.actions;

export const reviewSelector = (state) => state[namespace];
