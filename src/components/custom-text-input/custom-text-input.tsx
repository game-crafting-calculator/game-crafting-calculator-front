import React from "react";

interface CustomTextInputProps {
  type?: "text" | "date" | "password" | "number";
  placeholder?: string;
  action: Function;
}

export default function CustomTextInput({
  type,
  placeholder,
  action,
}: CustomTextInputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(event) => action(event)}
      />
    </>
  );
}
