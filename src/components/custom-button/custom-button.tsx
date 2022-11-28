import React from "react";
import "./custom-button.css";

interface CustomButtonProps {
  type?: string;
  text?: string;
  action?: Function;
}

export default function CustomButton({
  type,
  text,
  action,
}: CustomButtonProps) {
  return (
    <>
      <button className={`custom-button ${type}`}>{text}</button>
    </>
  );
}
