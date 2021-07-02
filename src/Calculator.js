import React, { PureComponent } from "react";

class Calculator extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="screen">
        <div className="calculator">{this.props.children}</div>
      </div>
    );
  }
}

export default Calculator;
