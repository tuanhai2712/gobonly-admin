import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'account';

// Reducer with inital state
const INITAL_STATE = {
  users: {
    loading: false,
    data: [],
    total: null
  },
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        users: {
          loading: false,
          data: [],
        },
      }
    },
    getAccountUser: (state) => ({
      ...state,
      users: {
        loading: true,
      },
    }),
    getAccountUserFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          users: {
            loading: false,
          },
        };
      return {
        ...state,
        users: {
          data: data.data,
          total: data.total,
          loading: false,
        },
      };
    },

  },
});

export const reducer = slice.reducer;

export const {
  reset,
  getAccountUser,
  getAccountUserFinish
} = slice.actions;

export const accountSelector = (state) => state[namespace];
