import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserInfoThunk = createAsyncThunk(
  'fetchCurrencyInfo',
  async ({ latitude, longitude }, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state);

    const { baseCurrency } = state.baseCurrency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    const apiKey = 'd4683b09d0c94ec0aebf0b2e043decbf';
    const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;
    try {
      const response = await axios.get(urlPosition);
      const data = response.data.results[0].annotations.currency.iso_code;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: 'GXTAwTC27izNMKgkEICdYnoNDqBwBeGs' },
});

export const exchangeCurrencyThunk = createAsyncThunk(
  'exchange/exchangeCurrencyThunk',
  async ({ from, to, amount }, thunkAPI) => {
    try {
      const {
        data: { query, info, result },
      } = await instance.get(`/convert`, {
        params: {
          from,
          to,
          amount,
        },
      });
      console.log('API response:', { query, info, result });
      return { ...query, rate: info.rate, result };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getlatestRatesThunk = createAsyncThunk(
  'currency/getlatestRatesThunk',
  async (baseCurrency, thunkAPI) => {
    try {
      const { data } = await instance.get(
        `/latest?symbols&base=${baseCurrency}`,
      );
      return Object.entries(data.rates);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
