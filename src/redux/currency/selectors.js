import { createSelector } from '@reduxjs/toolkit';

export const selectIsError = state => state.baseCurrency.currency.isError;

export const selectIsLoading = state => state.baseCurrency.currency.isLoading;

export const selectBaseCurrency = state =>
  state.baseCurrency.currency.baseCurrency;

export const selectRates = state => state.baseCurrency.currency.rates;

export const selectExchangeInfo = state =>
  state.baseCurrency.currency.exchangeInfo;

export const selectFilter = state => state.baseCurrency.filter;

export const selectFilteredRates = createSelector(
  [selectBaseCurrency, selectRates],
  (baseCurrency, rates) =>
    rates
      .filter(([key]) => key !== baseCurrency)
      .map(([key, value]) => ({
        key,
        value: (1 / value).toFixed(2),
      })),
);

export const selectFilteredCurrency = createSelector(
  [selectBaseCurrency, selectRates, selectFilter],
  (baseCurrency, rates, filter) =>
    rates
      .filter(
        ([key]) => key !== baseCurrency && key.toLowerCase().includes(filter),
      )
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) })),
);
