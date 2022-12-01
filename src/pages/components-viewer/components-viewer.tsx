import React from "react";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";
import userService from "../../services/user-service";

export default function ComponentsViewer() {
  const test = () => {
    console.log("aaaaaaaaaaaaa");
    userService.login({ email: "osef", password: "osef également" });
  };

  return (
    <div>
      <CustomButton onClick={test} text="TEST" theme="success" />
      <CustomButton text="TEST" theme="warn" />
      <CustomButton text="TEST" theme="error" />

      <CustomTextInput
        type="text"
        placeholder="JJ/MM/ADDDAAA"
        callback={(e: any) => console.log(e.target.value)}
        isValid={true}
      />
    </div>
  );
}
