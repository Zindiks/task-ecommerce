import React, { Component } from 'react';
import Style from './Attribute.module.scss';
export class AttributeSelectorPassive extends Component {
  render() {
    return (
      <div className={Style.AttributeSelector}>
        <p className={Style.Title}>{this.props.name.toUpperCase()}:</p>
        <div className={Style.Selector}>
          {this.props.items.map((item) => {
            return this.props.type === 'swatch' ? (
              <div
                key={item.value}
                className={
                  this.props.selected.id === item.id
                    ? Style.ColorSelectorActive
                    : Style.PassiveColor
                }
              >
                {console.log(item)}
                <div style={{ backgroundColor: item.value }}></div>
              </div>
            ) : (
              <div
                key={item.value}
                className={
                  this.props.selected.id === item.id ? Style.SizeActive : Style.PassiveSize
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

export default AttributeSelectorPassive;
