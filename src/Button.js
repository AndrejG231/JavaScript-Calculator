import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        style={{ gridArea: this.props.id }}
        id={this.props.id}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
