import React, { PureComponent } from "react";

class Display extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="displayContainer">
        <p id="display">{this.props.children}</p>
      </div>
    );
  }
}

export default Display;
