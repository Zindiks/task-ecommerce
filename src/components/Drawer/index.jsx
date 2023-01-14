import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTotalPrice } from '../../utils/calculations';
import { setDrawerClose, setIsDrawerOpen } from '../../store/slices/headerSlice';
import CartItem from '../CartItem';

import Style from './Drawer.module.scss';

export class Drawer extends Component {
  constructor(props) {
    super(props);

    this.refDrawer = createRef();

    this.handleClickOutside = (e) => {
      if (!e.path.includes(this.refDrawer.current)) {
        this.props.setDrawerClose();
      }
    };
  }
  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    return (
      <div ref={this.refDrawer}>
        <div onClick={() => this.props.setIsDrawerOpen()}>
          <img className={Style.cartImg} src="../img/header-cart.png" alt="cart" />
          {this.props.cartCount > 0 && (
            <div className={Style.cartItemCounter}>{this.props.cartCount}</div>
          )}
        </div>

        {this.props.isDrawerOpen && (
          <>
            <div className={Style.drawer}>
              <div className={Style.drawerHead}>
                <h3>
                  MyBag. <span>{this.props.cartCount} items</span>
                </h3>
              </div>

              <div className={Style.content}>
                {this.props.selectedData.map((item) => {
                  return <CartItem selectedData={item} key={item.article} height={'190px'} />;
                })}
              </div>

              <div className={Style.footer}>
                <div className={Style.footerInfo}>
                  <h3>Total</h3>
                  <h3>
                    {`${this.props.currency.symbol} ${getTotalPrice(
                      this.props.selectedData,
                      this.props.currency.symbol,
                    )}`}
                  </h3>
                </div>
                <div className={Style.footerButtons}>
                  <Link to="/cartlist" onClick={() => this.props.setDrawerClose()}>
                    <button className={Style.viewbagBtn}>VIEW BAG</button>
                  </Link>
                  <button className={Style.checkoutBtn}>CHECK OUT</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrawerOpen: state.headerSlice.isDrawerOpen,
  currency: state.headerSlice.currency,
  selectedData: state.cartSlice.selectedData,
  cartCount: state.cartSlice.cartCount,
});

const mapDispatchToProps = (dispatch) => ({
  setDrawerClose: () => dispatch(setDrawerClose()),
  setIsDrawerOpen: () => dispatch(setIsDrawerOpen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
