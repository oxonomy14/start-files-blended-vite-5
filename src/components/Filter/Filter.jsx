import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/currency/slice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeQuery = query => {
    dispatch(setFilter(query));
  };

  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={e => handleChangeQuery(e.target.value)}
    />
  );
};

export default Filter;
