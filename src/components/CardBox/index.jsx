import { Component } from 'react';
import { connect } from 'react-redux';
import Style from './CardBox.module.scss';
import { onClickPlus } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';
import { createArticleInObject } from '../../utils/calculations';
// import ContentLoader from 'react-content-loader';

// onClick={() => this.props.setSelected(this.props.item)}

class CardBox extends Component {
  render() {
    return (
      <div className={Style.card}>
        {this.props.status === 'loading' ? (
          <Skeleton />
        ) : (
          <>
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
                <p>{this.props.item.name}</p>

                <h5>
                  <span>
                    {this.props.currency.symbol}{' '}
                    {
                      this.props.item.prices.filter((price) => {
                        return price.currency.symbol === this.props.currency.symbol;
                      })[0].amount
                    }
                  </span>
                </h5>
              </div>
            </Link>

            <div
              onClick={() => this.props.onClickPlus(createArticleInObject(this.props.item))}
              className={!this.props.item.inStock ? '' : Style.button}
            >
              <img src="./img/cart.svg" alt="cart" />
            </div>
          </>
        )}
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
