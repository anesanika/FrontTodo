import axios from "axios";

const Delete = (props) => {

  const deleteRequest = async () => {
    try {
      await axios.delete(`https://anesa06.pythonanywhere.com/todo/lists/${props.taskId}`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      props.onDelete(props.taskId);
    } catch (error) {
      console.error("Delete Error", error);
    }
  }

  return (
    <button onClick={deleteRequest}>X</button>
  );
}

export default Delete;
