import React, { useEffect, useState } from "react";
import "./bookmarks.css";
import apiService from "../../services/api-service";
import CustomImage from "../../components/custom-image/custom-image";
import BookmarkToggle from "../../components/bookmark-toggle/bookmarl-toggle";
import { useNavigate } from "react-router-dom";

export default function Bookmarks(props: any) {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarkedRecipes();
  }, []);

  const getBookmarkedRecipes = async () => {
    try {
      const data = await apiService.bookmarks.list();
      setBookmarkedRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (recipe: any) => {
    const route = `/recipes/${recipe.recipe_id}`;
    navigate(route);
  };

  return (
    <div className="bookmarks">
      <h1>Bookmarks</h1>
      {bookmarkedRecipes.length > 0 ? (
        <div className="list">
          {bookmarkedRecipes.map((recipe: any) => (
            <div className="recipe" onClick={() => handleClick(recipe)}>
              <CustomImage src={recipe.image} size={20} />
              <span>{recipe.per_craft}</span>
              <span>{recipe.item_name}</span>
              <BookmarkToggle recipe_id={recipe.recipe_id} />
            </div>
          ))}
        </div>
      ) : (
        <p className="">No bookmarked recipes</p>
      )}
    </div>
  );
}
