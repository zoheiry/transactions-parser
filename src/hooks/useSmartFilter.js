import { useEffect, useState } from 'react';
import filterTransactions from '../utils/filterTransactions';
import searchToFilters from '../utils/searchToFilters';

const useSmartSearch = ({ transactions, searchQuery }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    const filters = searchToFilters(searchQuery);
    setFilteredTransactions(filterTransactions(transactions, filters));

  }, [searchQuery, transactions]);

  return filteredTransactions;
};

export default useSmartSearch;