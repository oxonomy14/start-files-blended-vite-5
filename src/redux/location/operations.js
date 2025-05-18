import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk для отримання геолокації
export const getUserLocation = createAsyncThunk(
  'fetchLocation',
  async (_, thunkAPI) => {
    try {
      const position = await new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const { latitude, longitude } = position.coords;
      //console.log('Latitude:', latitude);
      //console.log('Longitude:', longitude);

      return { latitude, longitude };
    } catch (error) {
      console.error(`Geolocation error (${error.code}): ${error.message}`);

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
