import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { onClickActive, onClickCurrency, onClickClose } from '../../store/slices/headerSlice';

import Style from './Currencies.module.scss';

export class Currencies extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.handleClickOutside = (e) => {
      if (!this.ref.current.contains(e.target)) {
        this.props.onClickClose();
      }
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  onChangeCurrency(currency) {
    this.props.onClickCurrency(currency);
    localStorage.setItem('CURRENCY', JSON.stringify(currency));
    this.props.onClickClose();
  }

  render() {
    if (this.props.currency === null) {
      return <>...</>;
    }
    return (
      <div className={Style.sort} ref={this.ref}>
        <div onClick={() => this.props.onClickActive()} className={Style.label}>
          {this.props.currency.symbol}
          <img src="../img/vector.png" alt="vector" />
        </div>

        <div className={Style.sortPopup}>
          {this.props.isActive && this.props.currenciesData && (
            <ul>
              {this.props.currenciesData.map &&
                this.props.currenciesData.map((currency) => {
                  return (
                    <li
                      onClick={() => this.onChangeCurrency(currency)}
                      key={currency.label}
                      className={
                        currency.label === this.props.currency.label ? Style.ActiveSort : ''
                      }
                    >
                      {`${currency.symbol} ${currency.label}`}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.headerSlice.currency,
  isActive: state.headerSlice.isActive,
  currenciesData: state.headerSlice.currenciesData,
  currenciesStatus: state.headerSlice.currenciesStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onClickActive: () => dispatch(onClickActive()),
  onClickClose: () => dispatch(onClickClose()),
  onClickCurrency: (e) => dispatch(onClickCurrency(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
