import React from "react";
import "./style.css";

function Input({ item, color, setItem, name, selected }) {
  return (
    <>
      <input
        onChange={(e) => setItem((item) => ({ ...item, cor: e.target.value }))}
        value={color}
        id={color}
        checked={(item.color = color)}
        type="radio"
        name={name}
      ></input>
      <label
        className={`radioLabel ${color}`}
        id={selected.cor === color ? "checked" : ""}
        htmlFor={color}
      ></label>
    </>
  );
}

export default Input;
