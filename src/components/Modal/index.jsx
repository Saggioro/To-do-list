import React from "react";
import "./style.css";
import Card, { colors } from "../Card";
import Radio from "../Radio";
import { IoIosCloseCircleOutline, IoIosArrowDropright } from "react-icons/io";
import api from "../../utils/api";

function Modal({ setCards, cards, setShow, show, setEdit, edit }) {
  const [error, setError] = React.useState(false);

  function handleChange({ target }) {
    setEdit({ ...edit, [target.name]: target.value });
  }

  async function handleEdit() {
    if (!edit.task.trim()) {
      setError(true);
    } else {
      try {
        await api.put(`/todos/${edit.id}`, edit);

        const updated = cards.map((card) => {
          if (edit.id === card.id) {
            return edit;
          }
          return card;
        });

        setCards(updated);
        setShow(false);
      } catch (err) {
        console.error(err);
      }

      setError(false);
    }
  }
  function handleCancel({ target }) {
    setError(false);
    setShow(false);
  }

  return (
    <div className={show ? "show" : "hide"}>
      <div className="modal-background">
        <div className="modal">
          <h1>Editar</h1>
          <Card
            className="addCard card"
            style={{ background: colors[edit.cor] }}
            hover={false}
          >
            <input
              className={error ? "error" : ""}
              autoComplete="off"
              value={edit.task}
              name="task"
              onChange={handleChange}
              type="text"
              maxLength="40"
            />

            <div className="radio">
              <Radio
                setItem={setEdit}
                item={edit}
                name="cor"
                id="cor-modal"
              ></Radio>
            </div>
          </Card>
          <div className="buttons">
            <span onClick={handleEdit}>
              <IoIosArrowDropright size={32} color="#67d758" />
            </span>
            <span onClick={handleCancel}>
              <IoIosCloseCircleOutline size={32} color="#ed1616" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
