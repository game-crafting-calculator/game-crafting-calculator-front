import React from "react";

export default function CustomImage(props: any) {
  return (
    <div
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
        backgroundImage: `url(${props.src})`,
        backgroundSize: props.bgSize || "cover",
        backgroundPosition: props.position || "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
