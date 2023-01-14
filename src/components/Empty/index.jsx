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
      message: 'Redirect in 3 sec',
      button: true,
      redirectPath: !this.props.categoriesData[0]?.name
        ? `/`
        : `/${this.props.categoriesData[0].name}`,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  // Prevents infinity loop
  componentDidUpdate(prevProps, prevState) {
    if (prevState.redirect !== this.state.redirect && this.state.redirect === true) {
      this.setState({
        redirect: false,
        message: 'STATUS 500 SERVER NOT RESPONDING',
        button: false,
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirectPath} />;
    }
    return (
      <div className={Style.Info}>
        <h1> {this.props.message}</h1>
        <p>{this.state.message}</p>
        <div>
          {this.state.button && (
            <NavLink to={this.state.redirectPath}>
              <ButtonBtn status={'active'} title="BACK TO HOME" />
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesData: state.headerSlice.categoriesData,
});

export default connect(mapStateToProps)(Empty);
