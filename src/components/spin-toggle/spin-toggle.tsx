import React, { useEffect, useState } from "react";
import CustomImage from "./../custom-image/custom-image";
import { BsArrowDownCircle } from "react-icons/bs";

export default function SpinToggle(props: any) {
  const [toggled, setToggled] = useState<boolean>(true);
  const [style, setStyle] = useState<any>({
    transition: "all 0.4s ease",
    display: "flex",
    alignItems: "center",
  });

  const onToggle = (e: any) => {
    setToggled(!toggled);
    let angle = toggled ? 180 : 0;
    console.log(style);
    setStyle({ ...style, transform: `rotate(${angle}deg)` });
  };

  return (
    <span style={style} onClick={onToggle}>
      <BsArrowDownCircle />
    </span>
  );
}
