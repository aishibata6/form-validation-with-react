import {useReducer} from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {value: "", isTouched: false};
  }
  return initialInputState;
};

// receives function as a value. (validateValue)
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    initialInputState,
  });

  const valueChangeHandler = (e) => {
    dispatch({type: "INPUT", value: e.target.value});
  };

  const inputBlurHandler = (e) => {
    dispatch({
      type: "BLUR",
    });
  };

  const reset = () => {
    dispatch({type: "RESET"});
  };

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
