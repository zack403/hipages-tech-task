export const formatToMoney = new Intl.NumberFormat('en-NI', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});