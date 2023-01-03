import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./bookmark-toggle.css";
import apiService from "../../services/api-service";

export default function BookmarkToggle(props: any) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    let { recipe_id } = props;
    console.log({ recipe_id });
    getBookmarkedRecipe();
  }, []);

  const styles = {
    width: `${props.size || 30}px`,
    height: `${props.size || 30}px`,
  };

  const getBookmarkedRecipe = async () => {
    let bookmark;

    try {
      let bookmarkedRecipes = await apiService.bookmarks.list();

      console.log({ bookmarkedRecipes });

      bookmark = bookmarkedRecipes.some(
        (e: any) => e.recipe_id === props.recipe_id
      );

      console.log({ bookmarkedRecipes, bookmark });
    } catch (error) {
      console.log({ error });
      bookmark = false;
    }

    setIsBookmarked(bookmark);
  };

  const toggleBookmark = async () => {
    isBookmarked
      ? await apiService.bookmarks.remove(props.recipe_id)
      : await apiService.bookmarks.add(props.recipe_id);

    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bookmarktoggle" onClick={toggleBookmark} style={styles}>
      {isBookmarked ? <AiFillStar /> : <AiOutlineStar />}
    </div>
  );
}
