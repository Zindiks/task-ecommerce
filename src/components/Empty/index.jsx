import { Component } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ButtonBtn from '../UI/ButtonBtn';

import Style from './Empty.module.scss';

class Empty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  render() {
    if (this.state.redirect) {
      return (
        <Navigate
          to={!this.props.categoriesData[0]?.name ? `/` : `/${this.props.categoriesData[0].name}`}
        />
      );
    }
    return (
      <div className={Style.Info}>
        <h1>{this.props.message}</h1>
        <div>
          <NavLink
            to={!this.props.categoriesData[0]?.name ? `/` : `/${this.props.categoriesData[0].name}`}
          >
            <ButtonBtn status={'active'} title="BACK TO HOME" />
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesData: state.headerSlice.categoriesData,
});

export default connect(mapStateToProps)(Empty);
