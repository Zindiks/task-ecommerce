import { Component } from 'react';
import Style from './ProductDetails.module.scss';
import AttributeSelector from '../../components/UI/AttributeSelector';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onClickPlus } from '../../store/slices/cartSlice';
import { reqGetDetail } from '../../graphql/requests';
import { fetchProductDetails, setSelectedToEpmty } from '../../store/slices/productSlice';
import ButtonBtn from '../../components/UI/ButtonBtn';
import { createArticleInObject } from '../../utils/calculations';
import HTMLReactParser from 'html-react-parser';

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
    this.props.setSelectedToEpmty(); // set Previous data to empty
    this.props.fetchProductDetails(reqGetDetail(this.props.params.id));
  }

  render() {
    return this.props.data ? (
      <div className={Style.Item}>
        <div className={Style.ImgList}>
          {this.props.data.data.product.gallery.map((image, index) => {
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
          <img
            src={this.props.data.data.product.gallery[this.state.selectedImg]}
            alt={this.props.data.data.product.id}
          />
        </div>

        <div className={Style.Info}>
          <div className={Style.Title}>
            <h3>{this.props.data.data.product.name}</h3>
            <p>{this.props.data.data.product.brand}</p>
          </div>

          <div className={Style.Attributes}>
            {this.props.data.data.product.attributes.map((attribute, index) => {
              return <AttributeSelector key={`att+${index}`} {...attribute} />;
            })}
          </div>

          <div className={Style.Price}>
            <p>PRICE:</p>

            <h5>
              <span>
                {this.props.currency.symbol}{' '}
                {
                  this.props.data.data.product.prices.filter((price) => {
                    return price.currency.symbol === this.props.currency.symbol;
                  })[0].amount
                }
              </span>
            </h5>
          </div>

          {this.props.data.data.product.inStock ? (
            <ButtonBtn
              onClick={() =>
                this.props.onClickPlus(createArticleInObject(this.props.data.data.product))
              }
              status={'active'}
              title="ADD TO CART"
            />
          ) : (
            <ButtonBtn status="passive" title="OUT OF STOCK" />
          )}
          {/* //DONE: replaced
            dangerouslySetInnerHtml to HTMLReactParser */}
          <div className={Style.Description}>
            {HTMLReactParser(this.props.data.data.product.description)}
          </div>
        </div>
      </div>
    ) : (
      <div>{this.props.params.id}</div>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.headerSlice.currency,
  data: state.productSlice.selected,
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlus: (value) => dispatch(onClickPlus(value)),
  fetchProductDetails: (value) => dispatch(fetchProductDetails(value)),
  setSelectedToEpmty: () => dispatch(setSelectedToEpmty()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDetails));
