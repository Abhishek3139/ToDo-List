import React from "react";

function List({ item, removeFn, handleEdit }) {
  return (
    <div className="grocery-list">
      {item.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeFn(id)}
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
