import { Component } from 'react';
import './styles.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import { connect } from 'react-redux';
import { Layout } from './Layout';
import Info from './pages/Info';
import { reqGetAll } from './graphql/requests';
import { fetchProducts } from './store/slices/productSlice';
import { fetchCategories, fetchCurrencies } from './store/slices/headerSlice';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    this.props.fetchProducts(reqGetAll(this.props.category));
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.fetchProducts(reqGetAll(this.props.category));
    }
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
            {this.props.categoriesData &&
              this.props.categoriesData.map((category) => (
                <Route path={`/${category.name}`} element={<Home />} key={category.name} />
              ))}
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
  fetchProducts: (data) => dispatch(fetchProducts(data)),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
