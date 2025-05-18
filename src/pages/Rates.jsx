import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getlatestRatesThunk } from '../redux/currency/operations';
import {
  selectFilteredRates,
  selectBaseCurrency,
  selectFilteredCurrency,
} from '../redux/currency/selectors';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';
import { selectIsError } from '../redux/currency/selectors';

const Rates = () => {
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();
  const filteredRates = useSelector(selectFilteredCurrency);
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(getlatestRatesThunk(baseCurrency));
    }
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
        <Filter />
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
      </Container>
    </Section>
  );
};

export default Rates;
