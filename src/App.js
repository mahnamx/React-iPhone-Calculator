import "./styles.css";
import React, { useState, useEffect } from "react";

function formatNumber(number) {
  const absNumber = Math.abs(number);
  if (absNumber >= 1e10) {
    return "Number too large";
  } else if (absNumber === Math.floor(absNumber)) {
    return absNumber.toLocaleString();
  } else {
    return number.toFixed(5);
  }
}

function formatResult(result) {
  if (result.toString().indexOf(".") !== -1) {
    return formatNumber(result);
  } else {
    return parseInt(result);
  }
}

function Calculator() {
  const [input, setInput] = useState("");

  function handleButtonClick(e) {
    const value = e.target.getAttribute("data-value");
    const shiftKey = e.shiftKey;

    switch (value) {
      case "clear":
        resetCalculator();
        break;
      case "equal":
        try {
          const result = eval(input);
          if (isNaN(result)) {
            setInput("Error");
          } else {
            setInput(formatResult(result));
          }
        } catch (error) {
          setInput("Error");
        }
        break;
      case "sqrt":
        setInput(formatResult(Math.sqrt(parseFloat(input))));
        break;
      case "log":
        setInput(formatResult(Math.log10(parseFloat(input))));
        break;
      case "sin":
        setInput(formatResult(Math.sin(parseFloat(input))));
        break;
      case "cos":
        setInput(formatResult(Math.cos(parseFloat(input))));
        break;
      case "tan":
        setInput(formatResult(Math.tan(parseFloat(input))));
        break;
      case "pow":
        setInput(formatResult(Math.pow(parseFloat(input), 2)));
        break;
      case "+":
        if (shiftKey) {
          // do nothing if shift key is pressed
        } else {
          setInput(input + value.replace("Shift", ""));
        }
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/mahnam-najafian-a3949818b/");
        break;
      default:
        setInput(input + value);
        break;
    }
  }

  function resetCalculator() {
    setInput("");
    document.activeElement.blur(); // unselects the calculator after reset
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const keyPressed = e.key;

      if (keyPressed === "Shift") {
        return;
      }

      switch (keyPressed) {
        case "Escape":
          resetCalculator();
          break;
        case "Enter":
          try {
            const result = eval(input.replace("=", ""));
            if (isNaN(result)) {
              setInput("Error");
            } else {
              setInput(formatResult(result));
            }
          } catch (error) {
            setInput("Error");
          }
          break;
        case "Backspace":
          setInput(input.slice(0, -1));
          break;
        default:
          setInput(input + keyPressed);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        <button onClick={handleButtonClick} data-value="1">
          1
        </button>
        <button onClick={handleButtonClick} data-value="2">
          2
        </button>
        <button onClick={handleButtonClick} data-value="3">
          3
        </button>
        <button onClick={handleButtonClick} data-value="+">
          +
        </button>
        <button onClick={handleButtonClick} data-value="4">
          4
        </button>
        <button onClick={handleButtonClick} data-value="5">
          5
        </button>
        <button onClick={handleButtonClick} data-value="6">
          6
        </button>
        <button onClick={handleButtonClick} data-value="-">
          -
        </button>
        <button onClick={handleButtonClick} data-value="7">
          7
        </button>
        <button onClick={handleButtonClick} data-value="8">
          8
        </button>
        <button onClick={handleButtonClick} data-value="9">
          9
        </button>
        <button onClick={handleButtonClick} data-value="*">
          *
        </button>
        <button onClick={handleButtonClick} data-value=".">
          .
        </button>
        <button onClick={handleButtonClick} data-value="0">
          0
        </button>
        <button onClick={handleButtonClick} data-value="sqrt">
          √
        </button>
        <button onClick={handleButtonClick} data-value="/">
          ÷
        </button>
        <button onClick={handleButtonClick} data-value="tan">
          tan
        </button>

        <button onClick={handleButtonClick} data-value="sin">
          sin
        </button>
        <button onClick={handleButtonClick} data-value="cos">
          cos
        </button>
        <button onClick={handleButtonClick} data-value="log">
          log
        </button>
        <button onClick={handleButtonClick} data-value="pow">
          x²
        </button>
        <button onClick={handleButtonClick} data-value="clear">
          AC
        </button>
        <button onClick={handleButtonClick} data-value="equal">
          =
        </button>
        <button
          className="linkedin"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/mahnam-najafian-a3949818b/",
              "_blank"
            )
          }
        ></button>
      </div>
    </div>
  );
}

export default Calculator;
