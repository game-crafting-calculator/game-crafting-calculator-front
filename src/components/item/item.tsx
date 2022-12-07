import React, { useEffect, useState } from "react";
import "./item.css";

export default function Item(props: any) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(JSON.stringify(props.tree.ingredients));
  }, []);

  return (
    <div className="item" style={{ marginLeft: `${25 + props.level * 5}px` }}>
      <div className="result">
        <button className="hide" onClick={() => setShow(!show)}>
          V
        </button>
        <span className="quantity">{props.tree.quantity}</span>
        <span>x</span>
        <span className="name">{props.tree.name}</span>
      </div>
      <div className="ingredients">
        {props.tree.ingredients && show ? (
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
