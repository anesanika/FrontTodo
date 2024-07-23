import axios from "axios";
import "./Edit.css";
import { useState } from "react";

const Edit = (props) => {
  const myItem = props.item;
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescrip, setEditDescrip] = useState("");

  const editTask = () => {
    setEditing(!editing);
    setEditTitle(myItem.title);
    setEditDescrip(myItem.description);
  };

  const completeEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://anesa06.pythonanywhere.com/todo/lists/${myItem.id}/`,
        {
          title: editTitle,
          description: editDescrip,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      props.onEditTask(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Edit Task Error", error);
    }
  };

  return (
    <div>
      <button onClick={editTask}>✎</button>
      {editing ? (
        <div className="editForm">
          <button onClick={(e) => setEditing(false)}>x</button>
          <form onSubmit={completeEdit}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              value={editDescrip}
              onChange={(e) => setEditDescrip(e.target.value)}
            ></textarea>

            <button type="submit">Edit</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Edit;
