import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'notification';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: [],
  total: null,
  create: {
    loading: false,
    result: false,
  },
  course: {
    data: [],
    loading: false
  },
  classes: {
    data: [],
    loading: false
  },
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
        course: {
          data: [],
          loading: false
        },
        create: {
          loading: false,
          result: false,
        },
        classes: {
          data: [],
          loading: false
        },
      }
    },
    getNotification: (state) => ({
      ...state,
      loading: true
    }),
    getNotificationFinish: (state, action) => {
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

    getCourse: (state) => ({
      ...state,
      course: {
        loading: true,
      }
    }),
    getCourseFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          course: {
            loading: false,
          }
        };
      return {
        ...state,
        course: {
          data: data.data,
          loading: false,
        }

      };
    },
    getClass: (state) => ({
      ...state,
      classes: {
        loading: true,
      }
    }),
    getClassFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          classes: {
            loading: false,
          }
        };
      return {
        ...state,
        classes: {
          data: data.data,
          loading: false,
        }
      };
    },
    createNotification: (state) => ({
      ...state,
      create: {
        result: false,
        loading: true
      }
    }),
    createNotificationFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          create: {
            result: false,
            loading: false
          }
        };
      return {
        ...state,
        create: {
          result: true,
          loading: false
        }
      };
    },

  },
});

export const reducer = slice.reducer;

export const {
  createNotification,
  createNotificationFinish,
  getClass,
  getClassFinish,
  getCourse,
  getCourseFinish,
  getNotification,
  getNotificationFinish,
  reset
} = slice.actions;

export const notificationSelector = (state) => state[namespace];
