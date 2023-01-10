import React, { useState, useEffect } from "react";
import Calculator from "../../components/calculator/calculator";
import "./recipe.css";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";
import InputAutocomplete from "../../components/input-autocomplete/input-autocomplete";
import apiService from "../../services/api-service";
import CustomImage from "../../components/custom-image/custom-image";
import BookmarkToggle from "../../components/bookmark-toggle/bookmarl-toggle";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuantity, setSearchQuantity] = useState(1);
  const [recipesList, setRecipesList] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>({});
  const [recipeTree, setRecipeTree] = useState<any>({});
  let { recipe_id } = useParams();

  useEffect(() => {
    getRecipesList();
  }, []);

  useEffect(() => {
    console.log({ recipesList });
    console.warn({ recipe_id });
    if (recipesList.length === 0) {
      return;
    }

    console.warn("aaaaaaaaaaaaaaa");

    if (!recipe_id) {
      console.warn("no id in url");
      return;
    }

    let recipe = recipesList.find((r) => r.recipe_id === Number(recipe_id));
    console.warn({ recipe });

    if (!recipe) {
      return;
    }

    setSearchValue(recipe?.item_name || "aaaaa");
    setSelectedRecipe(recipe);
    setSearchQuantity(recipe?.per_craft);
  }, [recipesList]);

  useEffect(() => {
    console.log({ selectedRecipe });
    getRecipeTree(selectedRecipe, searchQuantity);
  }, [selectedRecipe, searchQuantity]);

  useEffect(() => {
    console.log({ recipeTree });
  }, [recipeTree]);

  const handleAutocompleteSelect = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const getRecipesList = async () => {
    let data = await apiService.recipe.list();
    setRecipesList(data);
  };

  const getRecipeTree = async (recipe: any, quantity: number) => {
    let { recipe_id } = recipe;

    if (!recipe_id) {
      return false;
    }

    quantity = quantity || 1;
    let data = await apiService.recipe.getTree(recipe_id, quantity);
    data.quantity = quantity;
    setRecipeTree(data);
  };

  return (
    <div className="recipe-page">
      <h1>Crafting Calculator</h1>

      <div className="item">
        <div className="search">
          <CustomImage src={selectedRecipe.image} size="contain" />
          <CustomTextInput
            label=""
            name="item"
            type="number"
            // size={3}
            value={searchQuantity}
            min="1"
            onChange={(e: any) => {
              let value = e.target.value;
              if (value < 1 && value !== "") {
                return;
              }

              setSearchQuantity(value);
            }}
          />
          <InputAutocomplete
            placeholder="Search for an item"
            options={recipesList}
            callback={handleAutocompleteSelect}
            inputValue={searchValue}
            setInputValue={setSearchValue}
          />
          {Object.keys(recipeTree).length === 0 ? (
            <></>
          ) : (
            <BookmarkToggle recipe_id={selectedRecipe.recipe_id} />
          )}
        </div>
        <Calculator tree={recipeTree} />
      </div>
    </div>
  );
}
