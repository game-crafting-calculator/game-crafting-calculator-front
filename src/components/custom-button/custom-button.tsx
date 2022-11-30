import React from "react";
import "./custom-button.css";

export default function CustomButton(props: any) {
  return (
    <>
      <button
        onClick={props.onClick}
        type={props.type}
        className={`custom-button ${props.theme}`}
      >
        {props.text}
      </button>
    </>
  );
}
