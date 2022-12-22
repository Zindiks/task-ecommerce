export const getTotalPrice = (selected, currency) => {
  const total = selected.map(
    (selectedItem) =>
      selectedItem.prices.filter((item) => item.currency.symbol === currency)[0].amount *
      selectedItem.count,
  );

  return total.reduce((part, sum) => part + sum, 0).toFixed(2);
};

export const getCartCount = (selected) => {
  if (selected) {
    return selected.reduce((total, current) => current.count + total, 0);
  } else {
    return 0;
  }
};

export const createArticleInObject = (item) => {
  let itemObj = { ...item };
  itemObj.article = '';
  let article = itemObj.id;
  for (let i = 0; i < itemObj.attributes.length; i++) {
    article = article + `-${itemObj.attributes[i].selected.id}`;
  }
  itemObj.article = article;

  return itemObj;
};
