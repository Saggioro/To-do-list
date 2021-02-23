/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillDelete, AiFillCheckSquare } from "react-icons/ai";
import "./style.css";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { colors } from "../../components/Card";

function Todo({ children }) {
  const initialState = {
    tarefa: "",
    cor: "orange",
    check: false,
  };

  const [cards, setCards] = React.useState([]);
  const [item, setItem] = React.useState(initialState);
  const [error, setError] = React.useState(false);

  function handleChange({ target }) {
    setItem({ ...item, [target.name]: target.value });
  }
  function handleAddCard() {
    if (item.tarefa) {
      setCards([...cards, item]);
      setItem(initialState);
      setError(false);
    } else {
      setError(true);
    }
  }

  function handleDelete(chave) {
    const updated = cards.filter((card, index) => chave !== index);

    setCards(updated);
  }

  function handleCheck(chave) {
    const updated = cards.filter((card, index) => {
      if (chave === index) {
        card.check = !card.check;
        return card;
      }
      return card;
    });
    setCards(updated);
  }

  return (
    <div className="todo">
      <div className="todo-content">
        <h1>Saggioro's To do List</h1>
        <Card className="addCard card" hover={false}>
          <input
            className={error ? "error" : ""}
            autoComplete="off"
            placeholder="Digite aqui a tarefa..."
            value={item.tarefa}
            name="tarefa"
            onChange={handleChange}
            type="text"
          />

          <div className="radio">
            {Object.entries(colors).map((color, index) => {
              return (
                <Input
                  key={index}
                  color={color[0]}
                  setItem={setItem}
                  item={item}
                  selected={item}
                  name="cor"
                ></Input>
              );
            })}
          </div>
          <button onClick={handleAddCard}>
            <BsFillPlusCircleFill color={"white"} size={"24px"} />
          </button>
        </Card>
        {cards.map((card, index) => {
          return (
            <Card key={index} color={card.cor}>
              <div className="buttons">
                <button onClick={() => handleDelete(index)} type="button">
                  <AiFillDelete color="white" />
                </button>
                {/* <button type="button">
                    <AiFillEdit color="white" />
                  </button> */}
                <button onClick={() => handleCheck(index)} type="button">
                  <AiFillCheckSquare color="white" />
                </button>
              </div>
              <p className={card.check ? "checked" : ""}>{card.tarefa}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
