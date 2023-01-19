import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { setIsDrawerOpen, setCategory } from '../../store/slices/headerSlice';
import Drawer from '../Drawer';
import Currencies from '../Currencies';

import Style from './Header.module.scss';

export class Header extends Component {
  render() {
    return (
      <div className={Style.header}>
        <ul className={Style.categories}>
          {this.props.categoriesData.length > 0 &&
            this.props.categoriesData.map((category, index) => {
              return (
                <div
                  onClick={() => this.props.setCategory(category.name)}
                  key={index}
                  className={category.name === this.props.category ? Style.activeCategory : ''}
                >
                  <NavLink to={`/${category.name}`}>
                    <li>{category.name.toUpperCase()}</li>
                  </NavLink>
                  <div className={Style.ActiveBorder}></div>
                </div>
              );
            })}
        </ul>
        <div className={Style.logo} onClick={() => this.props.setCategory('all')}>
          <NavLink to="/all">
            <img src="../img/logo.svg" alt="logo" />
          </NavLink>
        </div>
        <div className={Style.actions}>
          <Currencies />
          <Drawer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // isCartOpen: state.headerSlice.isCartOpen,
  category: state.headerSlice.category,
  // selectedData: state.cartSlice.selectedData,
  categoriesData: state.headerSlice.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  setIsDrawerOpen: () => dispatch(setIsDrawerOpen()),
  setCategory: (categ) => dispatch(setCategory(categ)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
