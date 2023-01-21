import { Component } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as MinusIcon } from '../../assets/minus-square.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus-square.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

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
    const { imgWidth, imgHeight, selector, itemOption, attributeSize } = this.props.sizeProps;
    const showArrows = this.state.total > 1 && this.props.isActive;

    return (
      <div className={Style.cartItem} style={{ height: imgHeight }}>
        <div className={Style.cartItemOptions} style={{ width: itemOption }}>
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
                  brand={brand}
                  key={attribute.id + attribute.name + index}
                  attributeSize={attributeSize}
                />
              );
            })}
          </div>
        </div>
        <div className={Style.cartQI} height={imgHeight}>
          <div className={Style.cartQuantity}>
            <button
              style={{ width: selector, height: selector }}
              className={Style.selector}
              onClick={() => this.props.onClickPlus(this.props.selectedData)}
            >
              <PlusIcon style={{ width: selector, height: selector }} />
            </button>

            <div>{count}</div>
            <button
              style={{ width: selector, height: selector }}
              className={Style.selector}
              onClick={() => this.props.onClickMinus(this.props.selectedData)}
            >
              <MinusIcon style={{ width: selector, height: selector }} />
            </button>
          </div>

          <div className={Style.cartImage}>
            <img src={gallery[this.state.value]} alt='images' width={imgWidth} height={imgHeight} />

            {showArrows && (
              <>
                <div className={Style.btnLeft} onClick={() => this.onClickDirection('right')}>
                  <Arrow />
                </div>

                <div className={Style.btnRight} onClick={() => this.onClickDirection('left')}>
                  <Arrow />
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
