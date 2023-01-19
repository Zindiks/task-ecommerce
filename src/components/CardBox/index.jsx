import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { onClickPlus } from '../../store/slices/cartSlice';
import { createArticleInObject } from '../../utils/calculations';
import Skeleton from './Skeleton';

import Style from './CardBox.module.scss';

class CardBox extends Component {
  render() {
    if (this.props.status === true) {
      return (
        <div className={Style.card}>
          <Skeleton />
        </div>
      );
    }

    return (
      <div className={Style.card}>
        <Link to={`/product/${this.props.item.id}`} className={Style.link}>
          <div className={this.props.item.inStock ? '' : Style.OOS}>
            {this.props.item.inStock ? '' : <p className={Style.OOStext}>OUT OF STOCK</p>}
            <img
              className={Style.imageUrl}
              src={this.props.item.gallery[0]}
              alt={this.props.item.id}
            />
          </div>
          <div className={this.props.item.inStock ? '' : Style.OOS}>
            <p>
              <strong>{this.props.item.brand}</strong> {this.props.item.name}
            </p>
            {this.props.currency !== null && (
              <h5>
                <span>
                  {this.props.currency.symbol}
                  {this.props.item.prices
                    .filter((price) => price.currency.symbol === this.props.currency.symbol)[0]
                    .amount.toFixed(2)}
                </span>
              </h5>
            )}
          </div>
        </Link>

        <div
          onClick={() => this.props.onClickPlus(createArticleInObject(this.props.item))}
          className={!this.props.item.inStock ? '' : Style.button}
        >
          <img src="./img/cart.svg" alt="cart" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.headerSlice.currency,
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlus: (value) => dispatch(onClickPlus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardBox);
