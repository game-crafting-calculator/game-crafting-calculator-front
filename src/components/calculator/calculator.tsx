import React, { useState, useEffect } from "react";
import "./calculator.css";
import Item from "../item/item";

export default function Calculator(props: any) {
  return props.tree.ingredients ? (
    <div className="calculator">
      {props.tree.ingredients ? (
        props.tree.ingredients.map((e: any) => <Item tree={e} level={0} />)
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

/*
recupere l'id de l'item résultat

ajouter une recette avec l'id de l'item résultat et la quantity craftée

Pour chaque ingrédients
    ajouter l'ingredient dans la table needs
      - id de l'item en question
      - quantité
      - id de la recette
    
    
*/
