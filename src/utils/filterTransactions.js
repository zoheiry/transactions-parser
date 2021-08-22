const matchesCategory = (transaction, categorySelector) => {
    const OR = ' || ';
    const AND = ' && ';
    const andRegex = new RegExp('.* \\&\\& .*');
    const orRegex = new RegExp('.* \\|\\| .*');

    if (andRegex.test(categorySelector)) {
        const andCategoryArray = categorySelector.split(AND);
        return matchesCategory(transaction, andCategoryArray[0]) && matchesCategory(transaction, andCategoryArray.slice(1).join(AND));
    }

    if (orRegex.test(categorySelector)) {
        const orCategoryArray = categorySelector.split(OR);
        return matchesCategory(transaction, orCategoryArray[0]) && matchesCategory(transaction, orCategoryArray.slice(1).join(AND));
    }

    if (categorySelector.startsWith('!')) {
        return transaction.category !== categorySelector.replace('!', '');
    }

    return transaction.category === categorySelector;
}

const filterTransactions = (
    transactions = [],
    { direction, type, category, name, toAccount, dateFrom, dateTo } = {}
) =>
    transactions.filter(transaction =>
        (!direction || transaction[direction]) &&
        (!type || transaction.type === type) &&
        (!category || matchesCategory(transaction, category)) &&
        (!name || transaction.name === name) &&
        (!toAccount || transaction.toAccount === toAccount) &&
        (!dateFrom || new Date(transaction.date).getTime() > new Date(dateFrom).getTime()) &&
        (!dateTo || new Date(transaction.date).getTime() < new Date(dateTo).getTime())
    )

export default filterTransactions;
