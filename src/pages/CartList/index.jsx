import { Component } from 'react';
import { connect } from 'react-redux';

import { getTotalPrice } from '../../utils/calculations';
import { cleanData } from '../../store/slices/cartSlice';
import CartItem from '../../components/CartItem';
import Btn from '../../components/UI/Btn';

import Style from './CartList.module.scss';

class CartList extends Component {
  render() {
    return (
      <div className={Style.CartListPage}>
        <div className={Style.CartHeader}>
          <h1>CART</h1>
        </div>
        <div className={Style.Content}>
          {this.props.selectedData.map((item, index) => {
            return (
              <div key={index}>
                <div className={Style.Divider} key={index + 'divider'}></div>
                <CartItem selectedData={item} key={item.article} isActive={true} height={'auto'} />
              </div>
            );
          })}
          <div className={Style.Divider} key={'last'}></div>
        </div>

        <div className={Style.Footer}>
          <div>
            <p>Tax 21%:</p>
            <h3>
              {`${this.props.currency.symbol} ${(
                getTotalPrice(this.props.selectedData, this.props.currency.symbol) * 0.21
              ).toFixed(2)}`}
            </h3>
          </div>
          <div>
            <p>Quantity:</p>
            <h3>{this.props.cartCount}</h3>
          </div>

          <div>
            <p>Total:</p>
            <h3>
              {`${this.props.currency.symbol} ${getTotalPrice(
                this.props.selectedData,
                this.props.currency.symbol,
              )}`}
            </h3>
          </div>

          <Btn status="active" title="ORDER" onClick={() => this.props.cleanData()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedData: state.cartSlice.selectedData,
  currency: state.headerSlice.currency,
  cartCount: state.cartSlice.cartCount,
});

const mapDispatchToProps = (dispatch) => ({
  cleanData: () => dispatch(cleanData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartList);
