import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { setIsDrawerOpen, setCategory } from '../../store/slices/headerSlice';
import Drawer from '../Drawer';
import Currencies from '../Currencies';

import Style from './Header.module.scss';

export class Header extends Component {
  render() {
    const { categoriesList, setCategory } = this.props;
    return (
      <div className={Style.header}>
        <ul className={Style.categories}>
          {categoriesList.length > 0 &&
            categoriesList.map((category, index) => {
              return (
                <div
                  onClick={() => setCategory(category.name)}
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
        <div className={Style.logo} onClick={() => setCategory(`${this.props.category}`)}>
          <NavLink to={`/${this.props.category}`}>
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
  category: state.headerSlice.category,
  categoriesList: state.headerSlice.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  setIsDrawerOpen: () => dispatch(setIsDrawerOpen()),
  setCategory: (categ) => dispatch(setCategory(categ)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
