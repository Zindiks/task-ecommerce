//GraphQL
export const reqGetAll = (param) => {
  return `
query {category(input: { title: "${param}" }) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;
};

export const reqGetDetail = (param) => {
  return `query{
        product(id:"${param}"){
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id  
            }
          }
          prices{
            amount
            currency{
              label
              symbol
              
            }
            
          }
          brand
        }
      }`;
};

export const reqCategories = `query{
    categories{
      name
    }
  }`;

export const reqCurrencies = `query{
    currencies{
      label
      symbol
    }
  }`;
