import React, { useEffect } from "react";
import "./custom-text-input.css";

export default function CustomTextInput(props: any) {
  useEffect(() => {
    console.log(props.isValid !== undefined);
  }, [props.isValid]);

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
    <div className="custom-text-input">
      <label htmlFor={props.id}>{props.label || ""}</label>
      <input
        className={`${getValidity()}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event)}
        name={props.name}
        value={props.value}
        id={props.id}
        size={props.size}
        min={props.min}
      />
      {props.isValid || props.isValid === undefined ? (
        <></>
      ) : (
        <p className="error">{props.error || "invalid"}</p>
      )}
    </div>
  );
}
