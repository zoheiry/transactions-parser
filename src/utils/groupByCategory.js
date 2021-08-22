export const formatAmountInCents = (amountInCents) => parseFloat(amountInCents / 100).toFixed(2);

const groupByCategory = (transactions = []) =>
    transactions.reduce((groupedTransactions, transaction) => {
        const existingGroup = groupedTransactions.find(t => t.category === transaction.category);
        if (existingGroup) {
            existingGroup.total += Math.abs(transaction.amountInCents / 100);
        } else {
            groupedTransactions.push({ category: transaction.category, total: Math.abs(transaction.amountInCents / 100) });
        }
        return groupedTransactions.map(t => ({ ...t, total: Math.round(t.total) }));
    }, []);


export default groupByCategory;