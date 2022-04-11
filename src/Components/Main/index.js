import React, { useReducer } from "react";
import "./styles.css";

const ACTIONS = {
  ADDNUMBER: "addNumber",
  CHOOSEOPERATION: "chooseOperation",
  COMPUTE: "compute",
  PERCENTAGE: "percentage",
  SETSIGN: "setSign",
  CLEAR: "clear",
  DELETE: "delete"
};

function reducer(input, action) {
  switch (action.type) {
    case ACTIONS.ADDNUMBER:
      const value = action.payload;
      if (value === "." && input.current.includes(".")) return { ...input };
      if (value === "0" && input.current.includes("0")) return { ...input };
      return {
        ...input,
        current: input.current + value,
        start: false
      };
    case ACTIONS.CHOOSEOPERATION:
      const operationValue = action.payload;
      if (input.current === "") return { ...input };
      return {
        ...input,
        prev: input.current + "" + operationValue,
        current: "",
        operation: operationValue
      };

    case ACTIONS.COMPUTE:
      let computation;
      const prevNum = parseFloat(input.prev);
      const currentNum = parseFloat(input.current);
      if (isNaN(prevNum) || isNaN(currentNum)) return { ...input };
      switch (input.operation) {
        case "+":
          computation = prevNum + currentNum;
          break;
        case "-":
          computation = prevNum - currentNum;
          break;
        case "*":
          computation = prevNum * currentNum;
          break;
        case "/":
          computation = prevNum / currentNum;
          break;
        default:
          return;
      }
      return {
        ...input,
        current: computation,
        operation: undefined,
        prev: ""
      };

    case ACTIONS.PERCENTAGE:
      return {
        ...input,
        current: input.current / 100
      };

    case ACTIONS.SETSIGN:
      const signValue = action.payload;
      const finalCurrent = input.current.toString();
      if (signValue === "/-" && finalCurrent.includes("-")) return { ...input };
      if (input.isNegative === false) {
        return {
          ...input,
          current: "-" + input.current
        };
      } else {
        return {
          ...input,
          current: input.current
        };
      }

    case ACTIONS.CLEAR:
      return {
        ...input,
        prev: "",
        current: "",
        opertaion: undefined,
        start: true
      };

    case ACTIONS.DELETE:
      return {
        ...input,
        current: input.current.toString().slice(0, -1)
      };
    default:
      return input.current;
  }
}

export default function Main() {
  const [input, dispatch] = useReducer(reducer, {
    prev: "",
    current: "",
    operation: undefined,
    isNegative: false
  });

  return (
    <div className="calculator-bg">
      <div className="calculator">
        <input
          type="text"
          className="calculator-process"
          value={input.prev}
          disabled
        />
        <input
          type="text"
          id="display"
          className="calculator-screen"
          value={input.start ? "0" : input.current}
          placeholder="0"
          disabled
        />
        <div className="calculator-keys">
          <button
            type="button"
            id="clear"
            className="all-clear"
            value="all-clear"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            C
          </button>
          <button
            type="button"
            className="operator"
            value="%"
            onClick={() => dispatch({ type: ACTIONS.PERCENTAGE })}
          >
            %
          </button>
          <button
            type="button"
            className="operator"
            value="/-"
            onClick={(event) =>
              dispatch({ type: ACTIONS.SETSIGN, payload: event.target.value })
            }
          >
            +/-
          </button>
          <button
            type="button"
            id="divide"
            className="operator"
            value="/"
            onClick={(event) =>
              dispatch({
                type: ACTIONS.CHOOSEOPERATION,
                payload: event.target.value
              })
            }
          >
            &divide;
          </button>
          <button
            type="button"
            className="operator"
            value="*"
            onClick={(event) =>
              dispatch({
                type: ACTIONS.CHOOSEOPERATION,
                payload: event.target.value
              })
            }
            id="multiply"
          >
            &times;
          </button>
          <button
            type="button"
            className="operator"
            value="-"
            onClick={(event) =>
              dispatch({
                type: ACTIONS.CHOOSEOPERATION,
                payload: event.target.value
              })
            }
            id="subtract"
          >
            -
          </button>
          <button
            type="button"
            className="operator"
            value="+"
            onClick={(event) =>
              dispatch({
                type: ACTIONS.CHOOSEOPERATION,
                payload: event.target.value
              })
            }
            id="add"
          >
            +
          </button>
          <button
            type="button"
            id="seven"
            value="7"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            7
          </button>
          <button
            type="button"
            id="eight"
            value="8"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            8
          </button>
          <button
            type="button"
            id="nine"
            value="9"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            9
          </button>
          <button
            type="button"
            id="four"
            value="4"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            4
          </button>
          <button
            type="button"
            id="five"
            value="5"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            5
          </button>
          <button
            type="button"
            id="six"
            value="6"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            6
          </button>
          <button
            type="button"
            id="one"
            value="1"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            1
          </button>
          <button
            type="button"
            id="two"
            value="2"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            2
          </button>
          <button
            type="button"
            id="three"
            value="3"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            3
          </button>
          <button
            type="button"
            id="zero"
            value="0"
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            0
          </button>
          <button
            type="button"
            id=""
            value="<"
            onClick={() => dispatch({ type: ACTIONS.DELETE })}
          >
            &lt;
          </button>
          <button
            type="button"
            id="decimal"
            className="decimal"
            value="."
            onClick={(event) =>
              dispatch({ type: ACTIONS.ADDNUMBER, payload: event.target.value })
            }
          >
            .
          </button>
          <button
            type="button"
            id="equals"
            className="equal-sign"
            value="="
            onClick={() => dispatch({ type: ACTIONS.COMPUTE })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
