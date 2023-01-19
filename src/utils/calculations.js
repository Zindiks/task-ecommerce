export const getTotalPrice = (selected, currency) => {
  const total = selected.map(
    (selectedItem) =>
      selectedItem.prices.filter((item) => item.currency.symbol === currency)[0].amount *
      selectedItem.count,
  );

  return total.reduce((part, sum) => part + sum, 0).toFixed(2);
};

export const getCartCount = (selected) => {
  return selected ? selected.reduce((total, current) => current.count + total, 0) : 0;
};

export const selectFirstsAttributesToCart = (item) => {
  let article = item.id;
  const selected = {};

  for (let i = 0; i < item.attributes.length; i++) {
    selected[item.attributes[i].id] = item.attributes[i].items[0].value;
    article += `-${item.attributes[i].items[0].value}`;
  }

  return { ...item, article, selected };
};
