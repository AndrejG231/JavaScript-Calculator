import React, { Component } from "react";

import Calculator from "./Calculator";
import Button from "./Button";
import Display from "./Display";

import "./styles.css";

const keyDisplays = {
  clear: "C",
  add: "+",
  substract: "-",
  multiply: "x",
  divide: "/",
  decimal: ".",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  equals: "=",
};

const keyToCalcString = (key) => {
  if (key === "multiply") {
    return "*";
  } else {
    return keyDisplays[key];
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { calculation: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      calculation: this.state.calculation + keyToCalcString(key),
    });
  }

  render() {
    return (
      <Calculator>
        <Display>10+45+789123123213</Display>
        {Object.keys(keyDisplays).map((key, index) => (
          <Button key={index} id={key} onClick={() => this.handleClick(key)}>
            {keyDisplays[key]}
          </Button>
        ))}
      </Calculator>
    );
  }
}

export default App;
