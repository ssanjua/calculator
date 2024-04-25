import { useState } from 'react';
import './App.css'
import '@fontsource/dseg7-classic-mini';
// Supports weights 400-700
import '@fontsource-variable/pixelify-sans';

function App() {
  const [answer, setAnswer] = useState("0")
  const [expression, setExpression] = useState("")
  const et = expression.trim()

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h2>THIS IS A CALCULATOR FOR</h2>
        <h1>A GENIUS</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button
            onClick={() => buttonPress("clear")}
            className="btn-master"
            id="clear">C
          </button>
          <button
            onClick={() => buttonPress("negative")}
            className="btn-operator"
            id="negative">+/-
          </button>
          <button
            onClick={() => buttonPress("%")}
            className="btn-operator"
            id="percentage">%
          </button>
          <button
            onClick={() => buttonPress("/")}
            className="btn-operator"
            id="divide">/
          </button>
          <button
            onClick={() => buttonPress("7")}
            className="btn-number"
            id="seven">7
          </button>
          <button
            onClick={() => buttonPress("8")}
            className="btn-number"
            id="eight">8
          </button>
          <button
            onClick={() => buttonPress("9")}
            className="btn-number"
            id="nine">9
          </button>
          <button
            onClick={() => buttonPress("*")}
            className="btn-operator"
            id="multiply">*
          </button>
          <button
            onClick={() => buttonPress("4")}
            className="btn-number"
            id="four">4
          </button>
          <button
            onClick={() => buttonPress("5")}
            className="btn-number"
            id="five">5
          </button>
          <button
            onClick={() => buttonPress("6")}
            className="btn-number"
            id="six">6
          </button>
          <button
            onClick={() => buttonPress("-")}
            className="btn-operator"
            id="subtract">-
          </button>
          <button
            onClick={() => buttonPress("1")}
            className="btn-number"
            id="one">1
          </button>
          <button
            onClick={() => buttonPress("2")}
            className="btn-number"
            id="two">2
          </button>
          <button
            onClick={() => buttonPress("3")}
            className="btn-number"
            id="three">3
          </button>
          <button
            onClick={() => buttonPress("+")}
            className="btn-operator"
            id="add">+
          </button>
          <button
            onClick={() => buttonPress("0")}
            className="btn-number"
            id="zero">0
          </button>
          <button
            onClick={() => buttonPress(".")}
            className="btn-number"
            id="decimal">.
          </button>
          <button
            onClick={() => buttonPress("=")}
            className="btn-equals"
            id="equals">=
          </button>
        </div>
        <a href="https://www.github.com/ssanjua" target='_blank'>
          <h3>made with ❤️ by
            ssanjua
          </h3>
        </a>
      </div>
    </>
  )
}


export default App
