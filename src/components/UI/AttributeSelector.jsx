import { Component } from 'react';
import { connect } from 'react-redux';

import { updateSelectedAttribute, setSelectedAttributes } from '../../store/slices/productSlice';
import Style from './Attribute.module.scss';

export class AttributeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.items[0].id,
    };
  }

  onHandleClick(input) {
    this.setState({ selected: input.id });
    const obj = {
      type: this.props.id,
      active: input.id,
    };

    this.props.setSelectedAttributes(obj);
  }

  render() {
    return (
      <div className={Style.AttributeSelector}>
        <p className={Style.Title}>{this.props.name.toUpperCase()}:</p>
        <div className={Style.Selector}>
          {this.props.items.map((item) => {
            return this.props.type === 'swatch' ? (
              <div
                onClick={() => this.onHandleClick({ ...item, name: this.props.name })}
                key={item.value}
                className={
                  this.state.selected === item.id ? Style.ColorSelectorActive : Style.ColorSelector
                }
              >
                <div style={{ backgroundColor: item.value }}></div>
              </div>
            ) : (
              <div
                onClick={() => this.onHandleClick({ ...item, name: this.props.name })}
                key={item.value}
                className={this.state.selected === item.id ? Style.SizeActive : Style.SizeSelector}
              >
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSelectedAttribute: (value) => dispatch(updateSelectedAttribute(value)),
  setSelectedAttributes: (value) => dispatch(setSelectedAttributes(value)),
});

export default connect(null, mapDispatchToProps)(AttributeSelector);
