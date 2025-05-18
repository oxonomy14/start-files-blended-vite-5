import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { exchangeCurrencyThunk } from '../../redux/currency/operations';
import { useDispatch } from 'react-redux';

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.queryExchange.value.trim();

    const isValid = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/.test(
      inputValue,
    );
    if (!isValid) {
      alert('Error. Use "15 USD in UAH"');
      return;
    }

    //onSubmit(inputValue);
    console.log(inputValue);
    const [amount, from, , to] = inputValue.split(' ');
    const data = {
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      amount: Number(amount),
    };

    dispatch(exchangeCurrencyThunk(data));

    console.log(data);
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        placeholder="15 USD in UAH"
        name="queryExchange"
      />
    </form>
  );
};

export default ExchangeForm;
