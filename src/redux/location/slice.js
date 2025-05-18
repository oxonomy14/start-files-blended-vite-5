import { createSlice } from '@reduxjs/toolkit';
import { getUserLocation } from './operations';

const initialState = {
  latitude: null,
  longitude: null,
  error: null,
  isLoadingLocation: false,
};

const slice = createSlice({
  name: 'locationSlice',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getUserLocation.pending, state => {
        state.isLoadingLocation = true;
        state.error = null;
      })
      .addCase(getUserLocation.fulfilled, (state, action) => {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.isLoadingLocation = false;
      })
      .addCase(getUserLocation.rejected, (state, action) => {
        state.isLoadingLocation = false;
        state.error = action.error.message;
      });
  },
});

export const locationReducer = slice.reducer;
