import {useState} from "react";

// inputvalue state, touched, validity of each field, invalid,

// receives function as a value. (validateValue)
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setInputTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setInputTouched(false);
  };

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && inputTouched;

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
