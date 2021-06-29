import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'auth';

// Reducer with inital state
const INITAL_STATE = {
  isAuthenticated: false,
  loading: false,
  user: null
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    signIn: (state) => ({
      ...state,
      loading: true
    }),
    signInFinish: (state, action) => {
      const { user } = action.payload;
      if (!user) {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
        };
      }
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user,
      };
    },
    signOut: () => {
      return {
        ...INITAL_STATE,
      };
    },
  },
});

export const reducer = slice.reducer;

export const { signIn, signInFinish, signOut } = slice.actions;

export const authSelector = (state) => state[namespace];
