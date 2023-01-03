import React, { useEffect, useState } from "react";
import "./item.css";
import CustomImage from "../custom-image/custom-image";
import SpinToggle from "./../spin-toggle/spin-toggle";

export default function Item(props: any) {
  const [show, setShow] = useState(true);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    props.level > 0 ? setMargin(25 + props.level * 5) : setMargin(0);
    console.log(JSON.stringify(props.tree));
  }, []);

  return (
    <div className="item" style={{ marginLeft: `${margin}px` }}>
      <div className="result">
        <SpinToggle size={20} color="black" onClick={() => setShow(!show)} />
        <CustomImage src={props.tree.image} size="contain" />
        <span className="quantity">{props.tree.quantity}</span>
        <span className="name">{props.tree.item_name}</span>
      </div>
      <div
        style={{
          height: show ? "" : "0px",
          // visibility: show ? "visible" : "hidden",
          // overflowY: "hidden",
        }}
        className="ingredients"
      >
        {props.tree.ingredients ? (
          props.tree.ingredients.map((e: any) => (
            <Item tree={e} level={props.level + 1} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
