import React, { useState, useEffect } from "react";
// import CustomTextInput from "../custom-text-input/custom-text-input";
// import itemService from "../../services/recipe-service";

import "./input-autocomplete.css";
// import { FaHandPointLeft } from "react-icons/fa";

export default function InputAutocomplete(props: any) {
  // const [inputValue, setInputValue] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

  //send search to api useEffect
  useEffect(() => {
    setFilteredOptions([...props.options]);
    console.log({ props });
    console.log({ filteredOptions });
  }, [props.options]);

  useEffect(() => {
    setFilteredOptions(
      props.options.filter((e: any) => e.item_name.includes(props.inputValue))
    );
  }, [props.inputValue]);

  const searchChange = (e: any) => {
    props.setInputValue(e.target.value);
  };

  const optionSelect = (e: any, option: any) => {
    props.setInputValue(e.target.textContent);
    console.log(e.target.key);

    //set selected recipe
    props.callback(option);
  };

  return (
    <div className="input-autocomplete">
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={searchChange}
        onFocus={() => setShowAutocomplete(true)}
        onBlur={() => setShowAutocomplete(false)}
      />
      {showAutocomplete && filteredOptions.length !== 0 ? (
        <div className="options">
          {filteredOptions.map((option, index) => (
            <span key={index} onMouseDown={(e: any) => optionSelect(e, option)}>
              {option.item_name}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
