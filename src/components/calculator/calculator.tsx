import React, { useState, useEffect } from "react";
import "./calculator.css";
import CustomTextInput from "../custom-text-input/custom-text-input";

import Item from "../item/item";
import { naryTreeTraversal, getRecipeTree } from "./calculator.utils";
import CustomButton from "../custom-button/custom-button";

export default function Calculator() {
  const [recipe, setRecipe] = useState<any>({});
  const name = "iron sword";

  useEffect(() => {
    setRecipe(getRecipeTree(name, 3));
    console.log(recipe);
  }, []);

  return (
    <div className="calculator">
      <Item tree={recipe} level={1} />
      <div className="recipe"></div>
    </div>
  );
}
