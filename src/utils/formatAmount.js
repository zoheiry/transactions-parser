const formatAmount = (amount) =>
    `€ ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`

export default formatAmount;