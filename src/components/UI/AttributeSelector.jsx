import { Component } from 'react';
import Style from './Attribute.module.scss';

export class AttributeSelector extends Component {
  handleClick = (item) => {
    this.props.setOptions(this.props.id, item.value);
  };

  renderItem = (item) => {
    switch (this.props.type) {
      case 'swatch':
        return (
          <label
            key={item.value}
            className={
              this.props.selected[this.props.id] === item.value
                ? Style.ColorSelectorActive
                : Style.ColorSelector
            }
          >
            <input
              type="radio"
              name={this.props.name}
              value={item.value}
              checked={this.props.selected[this.props.id] === item.value}
              onChange={() => this.handleClick(item)}
              hidden
            />
            <div style={{ backgroundColor: item.value }}></div>
          </label>
        );
      default:
        return (
          <label
            key={item.value}
            className={
              this.props.selected[this.props.id] === item.value
                ? Style.SizeActive
                : Style.SizeSelector
            }
          >
            <input
              type="radio"
              name={this.props.name}
              value={item.value}
              checked={this.props.selected[this.props.id] === item.value}
              onChange={() => this.handleClick(item)}
              hidden
            />
            <p>{item.value}</p>
          </label>
        );
    }
  };

  componentDidMount() {
    this.props.setOptions(this.props.id, this.props.items[0].value);
  }

  render() {
    return (
      <div className={Style.AttributeSelector}>
        <p className={Style.Title}>{this.props.name.toUpperCase()}:</p>
        <div className={Style.Selector}>{this.props.items.map(this.renderItem)}</div>
      </div>
    );
  }
}

export default AttributeSelector;
