import { useState, useEffect } from 'react';
import groupTransactionsBy from '../utils/groupTransactionsBy';

const useGroupTransactions = ({ transactions, groupByField = '' }) => {
  const [groupedTransactions, setGroupedTransactions] = useState(transactions);
  
  useEffect(() => {
    if (groupByField) {
      setGroupedTransactions(
        groupTransactionsBy({ transactions, field: groupByField })
      );
    }
    
  }, [transactions, groupByField]);

  return groupedTransactions;
};

export default useGroupTransactions;