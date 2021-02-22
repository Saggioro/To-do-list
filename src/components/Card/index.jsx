/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";

export const colors = {
  orange: "linear-gradient(to bottom right, #ef8b6c , #f93419)",
  purple: "linear-gradient(to bottom right, #b177fb , #694d8e)",
  blue: "linear-gradient(to bottom right, #57a3fe , #204f94)",
  yellow: "linear-gradient(to bottom right, #ffb303 , #e8a006)",
};

function Card({ check, color = "purple", hover = true, children, ...rest }) {
  return (
    <div
      className={hover ? "card cardHover" : "card"}
      style={{ backgroundImage: colors[color] }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
