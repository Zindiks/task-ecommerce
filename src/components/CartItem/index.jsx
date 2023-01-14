import { Component } from 'react';
import { connect } from 'react-redux';

import { onClickPlus, onClickMinus } from '../../store/slices/cartSlice';

import Style from './CartItem.module.scss';
import AttributeSelector from '../UI/AttributeSelector';

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      total: this.props.selectedData.gallery.length - 1,
    };
  }

  price() {
    const price =
      this.props.selectedData.prices.filter((price) => {
        return price.currency.symbol === this.props.currency.symbol;
      })[0].amount * this.props.selectedData.count;

    return price.toFixed(2);
  }

  onClickDirection = (direction) => {
    if (direction === 'left') {
      this.setState({ value: this.state.value === 0 ? this.state.total : this.state.value - 1 });
    } else {
      this.setState({ value: this.state.value === this.state.total ? 0 : this.state.value + 1 });
    }
  };

  render() {
    const { name, brand, attributes, gallery, count, selected } = this.props.selectedData;
    return (
      <div className={Style.cartItem} style={{ height: this.props.height }}>
        <div className={Style.cartItemOptions}>
          <h3>{name}</h3>
          <p>{brand}</p>

          <h3>
            {this.props.currency.symbol} {this.price()}
          </h3>

          <div className={Style.cartItemOptionsX}>
            {attributes.map((attribute, index) => {
              return (
                <AttributeSelector
                  selected={selected}
                  {...attribute}
                  name={name}
                  brand={brand}
                  key={attribute.id + attribute.name + index}
                />
              );
            })}
          </div>
        </div>
        <div className={Style.cartQI}>
          <div className={Style.cartQuantity}>
            <div
              onClick={() => this.props.onClickPlus(this.props.selectedData)}
              className={Style.selector}
            >
              <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_150_1451)">
                  <path
                    d="M22.5 15V30"
                    stroke="#1D1F22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 22.5H30"
                    stroke="#1D1F22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
                </g>
                <defs>
                  <clipPath id="clip0_150_1451">
                    <rect width="45" height="45" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>{count}</div>
            <div
              onClick={() => this.props.onClickMinus(this.props.selectedData)}
              className={Style.selector}
            >
              <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 22.5H30"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </div>
          </div>

          <div className={Style.cartImage}>
            <img src={gallery[this.state.value]} alt="socks" />

            {this.state.total > 1 && this.props.isActive && (
              <>
                <div className={Style.btnLeft} onClick={() => this.onClickDirection('right')}>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className={Style.btnRight} onClick={() => this.onClickDirection('left')}>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
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
  onClickMinus: (value) => dispatch(onClickMinus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
