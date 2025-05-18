import styles from './ExchangeInfo.module.css';
import { selectExchangeInfo } from '../../redux/currency/selectors';
import { useSelector } from 'react-redux';

const ExchangeInfo = () => {
  const exchangeInfo = useSelector(selectExchangeInfo);

  if (!exchangeInfo) return null;

  const { amount, from, to, rate, result } = exchangeInfo;

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <p className={styles.details}>
          <span className={styles.accent}>{amount} </span>
          <span className={styles.accent}>{from} </span>
          in <span className={styles.accent}>{to}</span>
        </p>

        <p className={styles.details}>
          at the rate of
          <span className={styles.accent}> {rate}</span>
        </p>

        <p className={styles.title}>
          {result.toFixed(2)} {to}
        </p>
      </div>
    </div>
  );
};

export default ExchangeInfo;
