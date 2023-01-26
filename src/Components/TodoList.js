import React, { useRef, useState } from "react";
import Alert from "./Alert";
import List from "./List";

function TodoList() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "Please enter value", type: "danger" });
    } else if (name && isEditing) {
      //editset
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setAlert({
        show: true,
        msg: "Your Edit Value is Updated",
        type: "success",
      });
      setIsEditing(false);
    } else {
      const newitem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newitem]);
      setName("");
    }
  };
  const handleClear = () => {
    setList([]);
    setAlert(false);
    setIsEditing(false);
    setName("");
  };

  const handleEdit = (id) => {
    const singleItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(singleItem.title);
    setEditID(id);
  };
  const handleRemove = (id) => {
    setList(list.filter((value) => value.id !== id));
    setName("");
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  // if (isEditing || handleClear) {
  //   inputRef.current.focus();
  // }
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>ToDo List</h3>
        <div className="form-control">
          <input
            type={"text"}
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            item={list}
            removeFn={handleRemove}
            handleEdit={handleEdit}
            showAlert={showAlert}
          />
          <button className="clear-btn" onClick={handleClear}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default TodoList;
