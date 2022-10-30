import Style from './Attribute.module.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateSelectedAttribute } from '../../store/slices/productSlice';

export class AttributeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected,
    };
  }

  onHandleClick(input) {
    this.props.updateSelectedAttribute(input);
    this.setState({ selected: input });
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
                  this.state.selected.id === item.id
                    ? Style.ColorSelectorActive
                    : Style.ColorSelector
                }
              >
                <div style={{ backgroundColor: item.value }}></div>
              </div>
            ) : (
              <div
                onClick={() => this.onHandleClick({ ...item, name: this.props.name })}
                key={item.value}
                className={
                  this.state.selected.id === item.id ? Style.SizeActive : Style.SizeSelector
                }
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
});

export default connect(null, mapDispatchToProps)(AttributeSelector);
