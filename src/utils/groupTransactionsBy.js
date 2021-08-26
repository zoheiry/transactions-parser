const groupTransactionsBy = ({ transactions = [], field = '' }) =>
    transactions.reduce((groupedTransactions, transaction) => {
        const existingGroup = groupedTransactions.find(t => t[field] === transaction[field]);
        if (existingGroup) {
            existingGroup.total = existingGroup.total + Math.abs(transaction.amount);
        } else {
            groupedTransactions.push({ [field]: transaction[field], total: Math.abs(transaction.amount) });
        }
        return groupedTransactions;
    }, []).map(t => ({ ...t, total: t.total }));


export default groupTransactionsBy;