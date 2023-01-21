import { Component } from 'react';
import Style from './Attribute.module.scss';

export class AttributeSelector extends Component {
  componentDidMount() {
    if (this.props.changeable) {
      this.props.setOptions(this.props.id, this.props.items[0].value);
    }
  }

  handleClick = (item) => {
    this.props.setOptions(this.props.id, item.value);
  };

  renderItem = (item) => {
    const isSelected = this.props.selected[this.props.id] === item.value;
    const isChangeable = this.props.changeable;
    const isChangeableColorSelector = isChangeable ? Style.ColorSelector : Style.PassiveColor;
    const isChangeableSizeSelector = isChangeable ? Style.SizeSelector : Style.PassiveSize;

    switch (this.props.type) {
      case 'swatch':
        return (
          <label
            key={item.value}
            className={isSelected ? Style.ColorSelectorActive : isChangeableColorSelector}
            style={{
              width: this.props.attributeSize,
              height: this.props.attributeSize,
            }}
          >
            {isChangeable && (
              <input
                type='radio'
                name={this.props.name}
                value={item.value}
                checked={isSelected}
                onChange={() => this.handleClick(item)}
                hidden
              />
            )}

            <div
              style={{
                backgroundColor: item.value,
                width: this.props.attributeSize - 4,
                height: this.props.attributeSize - 4,
              }}
            ></div>
          </label>
        );
      default:
        return (
          <label
            key={item.value}
            className={isSelected ? Style.SizeActive : isChangeableSizeSelector}
          >
            {isChangeable && (
              <input
                type='radio'
                name={this.props.name}
                value={item.value}
                checked={isSelected}
                onChange={() => this.handleClick(item)}
                hidden
              />
            )}

            <p>{item.value}</p>
          </label>
        );
    }
  };

  render() {
    return (
      <div className={Style.AttributeSelector}>
        <p className={Style.Title}>{this.props.name.toUpperCase()}:</p>
        <div className={Style.Selector}>
          {this.props.items.map((item) => this.renderItem(item))}
        </div>
      </div>
    );
  }
}

export default AttributeSelector;
