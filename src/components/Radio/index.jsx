import React from "react";
import "./style.css";
import { colors } from "../Card";

function Input({ item, setItem, name, id }) {
  return (
    <>
      {Object.entries(colors).map((color) => {
        return (
          <div className="radio-container" key={color[0]}>
            <input
              onChange={(e) =>
                setItem((item) => ({ ...item, cor: e.target.value }))
              }
              value={color[0]}
              id={`${id + color[0]}`}
              checked={item.cor === color[0]}
              type="radio"
              name={name}
            ></input>
            <label
              className={`radioLabel ${color[0]}`}
              id={item.cor === color[0] ? "checked" : ""}
              htmlFor={`${id + color[0]}`}
            ></label>
          </div>
        );
      })}
    </>
  );
}

export default Input;
