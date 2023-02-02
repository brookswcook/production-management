import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useState } from "react";

const floatRegex = /^[+]?(\d+(?:[.])?\d*)$/;

export function FloatTextField({ value, onChange, ...props }: TextFieldProps) {
  const [inputValue, setInputValue] = useState(String(value ?? ""));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (floatRegex.test(newValue)) {
      onChange && onChange(event);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (floatRegex.test(newValue)) {
      setInputValue(newValue);
    } else {
      setInputValue(inputValue);
    }
  };

  return (
    <TextField
      value={inputValue}
      onChange={handleChange}
      onInput={handleInput}
      {...props}
    />
  );
}

export default FloatTextField;
