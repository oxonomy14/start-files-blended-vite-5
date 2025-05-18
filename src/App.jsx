import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import Rates from './pages/Rates';
import { useEffect } from 'react';
import { getUserLocation } from './redux/location/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectLatitude } from './redux/location/selectors';
import { selectLongitude } from './redux/location/selectors';
import { getUserInfoThunk } from './redux/currency/operations';
import { setDefaultCurrency } from './redux/currency/slice.js';

export const App = () => {
  const dispatch = useDispatch();
  const latitude = useSelector(selectLatitude);
  const longitude = useSelector(selectLongitude);

  useEffect(() => {
    dispatch(getUserLocation());
  }, [dispatch]);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getUserInfoThunk({ latitude, longitude }));
    } else {
      dispatch(setDefaultCurrency('USD'));
      // console.log('Геолокацію неможливо визначити');
    }
  }, [dispatch, latitude, longitude]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="rates" element={<Rates />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
