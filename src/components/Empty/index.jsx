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
      redirectPath: !this.props.categoriesData[0]?.name
        ? `/`
        : `/${this.props.categoriesData[0].name}`,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirectPath} />;
    }
    return (
      <div className={Style.Info}>
        <h1> {this.props.message}</h1>
        <p> Redirect in 3 sec</p>
        <div>
          <NavLink to={this.state.redirectPath}>
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
