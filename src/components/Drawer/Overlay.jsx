import { Component } from 'react';
import { connect } from 'react-redux';

import Style from './Drawer.module.scss';

class Overlay extends Component {
  render() {
    return <>{this.props.isDrawerOpen && <div className={Style.overlay}></div>}</>;
  }
}

const mapStateToProps = (state) => ({
  isDrawerOpen: state.headerSlice.isDrawerOpen,
});
export default connect(mapStateToProps)(Overlay);
