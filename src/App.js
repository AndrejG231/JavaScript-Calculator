import React, { Component } from "react";

import Calculator from "./Calculator";
import Button from "./Button";
import Display from "./Display";

import "./styles.css";

const keyDisplays = {
  clear: "C",
  add: "+",
  subtract: "-",
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
    this.state = { calculation: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleCharInput = this.handleCharInput.bind(this);
    this.handleValueInput = this.handleValueInput.bind(this);
    this.handleSum = this.handleSum.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  /* 
    Calculation made of list of objects:
      {type: "num", value: 120} || {type: "char", value: "*"}
  */

  handleClear() {
    return this.setState({ calculation: [] });
  }

  handleValueInput(key) {
    const calc = this.state.calculation;

    if (calc.length === 0 || calc[calc.length - 1].type === "char") {
      return this.setState({
        calculation: [...calc, { type: "num", value: keyToCalcString(key) }],
      });
    } else {
      return this.setState({
        calculation: [
          ...calc.slice(0, calc.length - 1),
          {
            type: "num",
            value: `${parseInt(
              calc[calc.length - 1].value + keyToCalcString(key)
            )}`,
          },
        ],
      });
    }
  }

  handleCharInput(key) {
    const calc = this.state.calculation;
    // Ignore characters on calculation start
    if (calc.length === 0) {
      return;
    } else if (calc[calc.length - 1].type === "char") {
      // In case that last thing typed was also a char > replace it
      // If current char was minus and last was not => append

      if (calc[calc.length - 1].value !== "-" && key === "subtract") {
        return this.setState({
          calculation: [...calc, { type: "char", value: keyToCalcString(key) }],
        });
      }

      // In case of two chars at row.. ETC 5*-10...
      if (calc[calc.length - 2].type === "char") {
        return this.setState({
          calculation: [
            ...calc.slice(0, calc.length - 2),
            { type: "char", value: keyToCalcString(key) },
          ],
        });
      }

      return this.setState({
        calculation: [
          ...calc.slice(0, calc.length - 1),
          { type: "char", value: keyToCalcString(key) },
        ],
      });
    } else {
      // In case last thing was a nubmer append a character
      return this.setState({
        calculation: [...calc, { type: "char", value: keyToCalcString(key) }],
      });
    }
  }

  handleDecimal() {
    const calc = this.state.calculation;

    // In case of decimal after marker
    if (
      calc.length > 0 &&
      ["/", "*", "+", "-"].includes(calc[calc.length - 1].value)
    ) {
      console.log("THis");
      return this.setState({
        calculation: [
          ...calc,
          { type: "num", value: "0" },
          { type: "char", value: "." },
        ],
      });
    }
    // Find last decimal or last marker
    for (let i = calc.length - 1; i >= 0; i--) {
      if (calc[i].value === ".") {
        return;
      }
      if (["/", "*", "+", "-"].includes(calc[i].value)) {
        return this.setState({
          calculation: [...calc, { type: "char", value: "." }],
        });
      }
    }

    return this.setState({
      calculation: [...calc, { type: "char", value: "." }],
    });
  }

  handleSum() {
    let sum = 0;
    try {
      sum = eval(this.state.calculation.map((item) => item.value).join(""));
      // In case of sum pressed when last item was not a number => IGNORE.
    } catch (error) {
      sum = eval(
        this.state.calculation
          .slice(0, this.state.calculation.length - 1)
          .map((item) => item.value)
          .join("")
      );
    }

    return this.setState({ calculation: [{ type: "num", value: `${sum}` }] });
  }

  handleClick(key) {
    if (key === "equals") {
      return this.handleSum();
    } else if (key === "clear") {
      return this.handleClear();
    } else if (key === "decimal") {
      return this.handleDecimal();
    } else if (
      ["clear", "add", "subtract", "multiply", "divide"].indexOf(key) >= 0
    ) {
      return this.handleCharInput(key);
    } else {
      return this.handleValueInput(key);
    }
  }

  render() {
    return (
      <Calculator>
        <Display>
          {this.state.calculation.length
            ? this.state.calculation.map((item) => item.value).join("")
            : "0"}
        </Display>
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
