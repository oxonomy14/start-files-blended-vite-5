import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';
import {
  selectIsError,
  selectExchangeInfo,
  selectIsLoading,
} from '../redux/currency/selectors';
import { useSelector } from 'react-redux';

const Home = () => {
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        <ExchangeForm />
        {isLoading && <Loader />}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
