import axios from "axios";

const Add = (props) => {

  const addTask = async (e) => {
    try {
      const response = await axios.post(
        'https://anesa06.pythonanywhere.com/todo/lists/',
        {
          title: props.titleValue,
          description: props.descriptValue,
        },
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (error) {
      console.error("Add Task Error", error);
    }
  }
  


  return (
    <button type="submit" onClick={addTask}>Add</button>
  );
}
export default Add