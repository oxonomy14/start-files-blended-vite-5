import Select from 'react-select';
import symbols from './symbols.json';
import styles from './SelectRates.module.css';
import './ReactSelect.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/currency/slice';

const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();
  const handleChangeCurrency = selectedOption => {
    dispatch(setBaseCurrency(selectedOption.value));
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>
        Your base currency:&nbsp;{baseCurrency}&nbsp;
      </p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
        onChange={handleChangeCurrency}
      />
    </div>
  );
};

export default SelectRates;
