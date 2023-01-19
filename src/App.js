import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, fetchCurrencies } from './store/slices/headerSlice';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import Info from './pages/Info';

import { Layout } from './Layout';

import './styles.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    const basic = async () => {
      await this.props.fetchCategories();
      await this.props.fetchCurrencies();
    };
    basic();
  }

  render() {
    return (
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Info />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cartlist" element={<CartList />} />
            <Route path="/:id" element={<Home />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.headerSlice.category,
  categoriesData: state.headerSlice.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
