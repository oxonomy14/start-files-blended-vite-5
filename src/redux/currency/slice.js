import { createSlice } from '@reduxjs/toolkit';
import {
  getUserInfoThunk,
  getlatestRatesThunk,
  exchangeCurrencyThunk,
} from './operations';

const initialState = {
  currency: {
    baseCurrency: null,
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  error: null,
  filter: '',
};

const slice = createSlice({
  name: 'currencySlice',
  initialState,
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.currency.baseCurrency = action.payload;
    },
    setBaseCurrency(state, action) {
      state.currency.baseCurrency = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfoThunk.pending, state => {
        state.error = null;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        state.currency.baseCurrency = action.payload;
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getlatestRatesThunk.pending, state => {
        state.currency.isLoading = true;
        state.currency.isError = null;
      })
      .addCase(getlatestRatesThunk.fulfilled, (state, action) => {
        state.currency.isLoading = false;
        state.currency.rates = action.payload;
      })
      .addCase(getlatestRatesThunk.rejected, (state, action) => {
        state.currency.isLoading = false;
        state.currency.isError = action.payload;
      })
      .addCase(exchangeCurrencyThunk.pending, state => {
        state.currency.isLoading = true;
        state.currency.isError = null;
      })
      .addCase(exchangeCurrencyThunk.fulfilled, (state, action) => {
        state.currency.isLoading = false;
        state.currency.exchangeInfo = action.payload;
      })
      .addCase(exchangeCurrencyThunk.rejected, (state, action) => {
        state.currency.isLoading = false;
        state.currency.isError = action.payload;
        state.currency.exchangeInfo = null;
      });
  },
});

export const currencyReducer = slice.reducer;
export const { setBaseCurrency, setFilter, setDefaultCurrency } = slice.actions;
