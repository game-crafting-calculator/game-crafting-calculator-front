import React from "react";
import "./custom-text-input.css";

export default function CustomTextInput(props: any) {
  const getValidity = () => {
    switch (props.isValid) {
      case true:
        return "valid";

      case false:
        return "invalid";

      default:
        return "";
    }
  };

  return (
    <>
      <input
        className={`custom-text-input ${getValidity()}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event)}
        name={props.name}
        id={props.id}
      />
    </>
  );
}
