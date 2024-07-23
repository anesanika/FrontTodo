import { motion } from "framer-motion";
import Delete from "../delete/Delete";
import Edit from "../edit/Edit";

const Todo = (props) => {
  return (
    <div className="todos">
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div>
        <Edit item={props.item} onEditTask={props.edit} />
        <Delete taskId={props.id} onDelete={props.delete} />
      </div>
    </div>
  );
};

export default Todo;
