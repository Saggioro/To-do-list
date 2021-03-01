/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillDelete, AiFillCheckSquare, AiFillEdit } from "react-icons/ai";
import "./style.css";
import Card, { colors } from "../../components/Card";
import Radio from "../../components/Radio";
import Modal from "../../components/Modal";

import api from "../../utils/api";

function Todo() {
  const initialState = {
    id: 0,
    task: "",
    cor: "blue",
    check: false,
  };

  const [cards, setCards] = React.useState([]);
  const [item, setItem] = React.useState(initialState);
  const [error, setError] = React.useState(false);
  const [edit, setEdit] = React.useState(initialState);
  const [show, setShow] = React.useState(false);

  function handleChange({ target }) {
    setItem({ ...item, [target.name]: target.value });
  }
  async function handleAddCard() {
    if (!item.task.trim()) {
      setError(true);
    } else {
      try {
        const response = await api.post("/todos", item);
        setCards([...cards, response.data]);
      } catch (err) {
        console.error(err);
      }

      setItem(initialState);
      setError(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/todos/${id}`);
      const updated = cards.filter((card) => card.id !== id);

      setCards(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCheck(id) {
    try {
      let todo;
      const updated = cards.filter((card, index) => {
        if (id === card.id) {
          card.check = !card.check;
          todo = card;

          return card;
        }
        return card;
      });
      await api.put(`/todos/${id}`, todo);

      setCards(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEdit(todo) {
    setEdit(todo);
    setShow(true);
  }

  async function apiHandler() {
    const response = await api.get("/todos");
    setCards(response.data);
  }

  React.useEffect(() => {
    apiHandler();
  }, []);

  return (
    <>
      <div className="todo">
        <div className="todo-content">
          <h1>My To do List</h1>
          <Card
            className="addCard card"
            style={{ backgroundImage: colors[item.cor] }}
            hover={false}
          >
            <input
              className={error ? "error" : ""}
              autoComplete="off"
              placeholder="Digite aqui a tarefa..."
              value={item.task}
              name="task"
              onChange={handleChange}
              type="text"
              maxLength="40"
            />

            <div className="radio">
              <Radio
                setItem={setItem}
                item={item}
                name="cor"
                id="cor-todo"
              ></Radio>
            </div>
            <button onClick={handleAddCard}>
              <BsFillPlusCircleFill color={"white"} size={"24px"} />
            </button>
          </Card>

          {cards.map((card, index) => {
            return (
              <Card key={index} color={card.cor}>
                <div className="buttons">
                  <button onClick={() => handleDelete(card.id)} type="button">
                    <AiFillDelete color="white" />
                  </button>
                  <button type="button">
                    <AiFillEdit
                      onClick={() => handleEdit(card)}
                      color="white"
                    />
                  </button>
                  <button onClick={() => handleCheck(card.id)} type="button">
                    <AiFillCheckSquare color="white" />
                  </button>
                </div>
                <p className={card.check ? "checked" : ""}>{card.task}</p>
              </Card>
            );
          })}
        </div>
      </div>
      <Modal
        cards={cards}
        setCards={setCards}
        show={show}
        setShow={setShow}
        edit={edit}
        setEdit={setEdit}
      ></Modal>
    </>
  );
}

export default Todo;
