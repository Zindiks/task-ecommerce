import { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import HTMLReactParser from 'html-react-parser';

import Empty from '../../components/Empty';
import AttributeSelector from '../../components/UI/AttributeSelector';
import ButtonBtn from '../../components/UI/ButtonBtn';
import { onClickPlus } from '../../store/slices/cartSlice';
import { createArticleInObject } from '../../utils/calculations';
import { QUERY_PRODUCT_BY_ID } from '../../graphql/queries';
import { setCategory } from '../../store/slices/headerSlice';

import Style from './ProductDetails.module.scss';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: 0,
    };
  }

  componentDidMount() {
    this.props.onChange('');
  }

  render() {
    return (
      <Query query={QUERY_PRODUCT_BY_ID} variables={{ id: this.props.params.id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...{this.props.params.id}</p>;
          }
          if (error) {
            return (
              <p>
                Error {error.message} {this.props.params.id}
              </p>
            );
          }
          if (data?.product === null) {
            return <Empty message={`HAVEN'T FOUND A PARTICULAR PRODUCT`} />;
          }
          return (
            <div className={Style.Item}>
              <div className={Style.ImgList}>
                {data.product.gallery.map((image, index) => {
                  return (
                    <img
                      key={index}
                      onMouseOver={() => this.setState({ selectedImg: index })}
                      src={image}
                      alt={index}
                      className={this.state.selectedImg === index ? Style.Active : ''}
                    />
                  );
                })}
              </div>

              <div className={Style.SelectedImg}>
                <img src={data.product.gallery[this.state.selectedImg]} alt={data.product.id} />
              </div>

              <div className={Style.Info}>
                <div className={Style.Title}>
                  <h3>{data.product.name}</h3>
                  <p>{data.product.brand}</p>
                </div>

                <div className={Style.Attributes}>
                  {data.product.attributes.map((attribute, index) => {
                    return <AttributeSelector key={`att+${index}`} {...attribute} />;
                  })}
                </div>

                <div className={Style.Price}>
                  <p>PRICE:</p>

                  <h5>
                    <span>
                      {this.props.currency.symbol}{' '}
                      {data.product.prices
                        .filter((price) => {
                          return price.currency.symbol === this.props.currency.symbol;
                        })[0]
                        .amount.toFixed(2)}
                    </span>
                  </h5>
                </div>

                {data.product.inStock ? (
                  <ButtonBtn
                    onClick={() => this.props.onClickPlus(createArticleInObject(data.product))}
                    status={'active'}
                    title="ADD TO CART"
                  />
                ) : (
                  <ButtonBtn status="passive" title="OUT OF STOCK" />
                )}
                <div className={Style.Description}>{HTMLReactParser(data.product.description)}</div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.headerSlice.currency,
  data: state.productSlice.selected,
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlus: (value) => dispatch(onClickPlus(value)),
  onChange: (value) => dispatch(setCategory(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDetails));
