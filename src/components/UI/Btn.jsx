import { Component } from 'react';

import Style from './Button.module.scss';

export class Btn extends Component {
  render() {
    return (
      <div
        className={this.props.status === 'active' ? Style.ButtonActive : Style.ButtonPassive}
        onClick={this.props.onClick}
      >
        <button>{this.props.title}</button>
      </div>
    );
  }
}

export default Btn;
