import React from "react";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

export default function ComponentsViewer() {
  return (
    <div>
      <CustomButton text="TEST" type="success" />
      <CustomButton text="TEST" type="warn" />
      <CustomButton text="TEST" type="error" />

      <CustomTextInput
        type="date"
        placeholder="JJ/MM/ADDDAAA"
        action={(e: any) => console.log(e.target.value)}
      />
    </div>
  );
}
