import React from "react";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";
import InputAutocomplete from "../../components/input-autocomplete/input-autocomplete";

import "./components-viewer.css";
import BookmarkToggle from "../../components/bookmark-toggle/bookmarl-toggle";

export default function ComponentsViewer() {
  const test = () => {
    console.log("aaaaaaaaaaaaa");
  };

  return (
    <div className="viewer-page">
      <CustomButton onClick={test} text="TEST" theme="success" />
      <CustomButton text="TEST" theme="warn" />
      <CustomButton text="TEST" theme="error" />

      <CustomTextInput
        type="text"
        placeholder="JJ/MM/ADDDAAA"
        callback={(e: any) => console.log(e.target.value)}
        isValid={true}
      />
      <BookmarkToggle />
    </div>
  );
}
