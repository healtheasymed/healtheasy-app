const formatAmount = (value) => Math.round(value * 100);

const parseStringToNumber = (value) => Number(value.replace(',', '.'));

const formatCurrency = (value) => {
  value = Number(value);
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return value;
};

const formatStripeCurrency = (value) => {
  if (!value) {
    return '0,00';
  }

  value = String(value);
  value = value.split('');
  value.splice(-2, 0, ',');

  return value.join('');
};

export {
  formatAmount,
  parseStringToNumber,
  formatCurrency,
  formatStripeCurrency,
};
