import { Component } from 'react';
import Currencies from '../Currencies';
import { connect } from 'react-redux';
import { setIsDrawerOpen, setCategory } from '../../store/slices/headerSlice';
import { Link } from 'react-router-dom';
import Drawer from '../Drawer';
import Style from './Header.module.scss';

export class Header extends Component {
  // componentDidMount() {
  //   this.setState({ categories: this.props.categoriesData });
  // }

  cartCount = () => {
    return this.props.selectedData.reduce((total, current) => current.count + total, 0);
  };

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
                  <Link to={`/${category.name}`}>
                    <li>{category.name.toUpperCase()}</li>
                  </Link>
                  <div className={Style.ActiveBorder}></div>
                </div>
              );
            })}
        </ul>
        <div className={Style.logo} onClick={() => this.props.setCategory('all')}>
          <Link to="/all">
            <img src="../img/logo.svg" alt="logo" />
          </Link>
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
  isCartOpen: state.headerSlice.isCartOpen,
  category: state.headerSlice.category,
  selectedData: state.cartSlice.selectedData,
  categoriesData: state.headerSlice.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  setIsDrawerOpen: () => dispatch(setIsDrawerOpen()),
  setCategory: (categ) => dispatch(setCategory(categ)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
