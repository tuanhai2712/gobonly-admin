import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'banner';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
  total: null,
  uploadResult: false,
  bannerUpdate: {
    loading: false,
    id: null
  }
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        uploadResult: false,
        bannerUpdate: {
          loading: false,
          id: null,
          result: false
        }
      }
    },
    getBanner: (state, action) => ({
      ...state,
      loading: true
    }),
    getBannerFinish: (state, action) => {
      const { error, data } = action.payload;
      if (error)
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
    uploadBanner: (state) => ({
      ...state,
      loading: true
    }),
    uploadBannerFinish: (state, action) => {
      const { error, data } = action.payload;
      if (error)
        return {
          ...state,
          loading: false,
        };
      return {
        ...state,
        loading: false,
        uploadResult: data.data.success
      };
    },
    updateBanner: (state, action) => {
      return {
        ...state,
        bannerUpdate: {
          loading: true,
          id: action.payload.bannerId,
        }
      }
    },
    updateBannerFinish: (state, action) => {
      const { error } = action.payload;
      if (error)
        return {
          ...state,
          bannerUpdate: {
            loading: false,
            id: null,
          }
        };
      return {
        ...state,
        loading: false,
        bannerUpdate: {
          loading: false,
          id: null,
        }
      };
    },
    deleteBanner: (state, action) => {
      return {
        ...state,
        bannerUpdate: {
          loading: true,
          id: action.payload.bannerId,
        }
      }
    },
  },
});

export const reducer = slice.reducer;

export const { reset, getBanner, getBannerFinish, uploadBanner, uploadBannerFinish, updateBanner, updateBannerFinish, deleteBanner } = slice.actions;

export const bannerSelector = (state) => state[namespace];
