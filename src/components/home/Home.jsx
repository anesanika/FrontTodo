import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Add from "./add/Add";
import { Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Todo from "./todo/Todo";

function Home(props) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://anesa06.pythonanywhere.com/todo/lists",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setTaskList(response.data);
      } catch (error) {
        console.error("Fetch Error", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTaskList((prevTaskList) => [newTask, ...prevTaskList]);
    setTitle("");
    setDescription("");
  };

  const handleEditTask = (updatedTask) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>{props.user.username}'s Todos</title>
      </Helmet>

      <div className="home">
        {props.user ? (
          <>
            <div>
              <div className="profile">
                <h2>
                  Welcome{" "}
                  <span style={{ color: "purple" }}>{props.user.username}</span>
                  ,
                  <br />
                  Let's see waht we've got to do today📝
                </h2>
                <button onClick={() => LogOut()}>LogOut</button>
              </div>
            </div>
            <div
              className="todoForm"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="todoCont">
                <form>
                  <input
                    type="text"
                    placeholder="Task Name"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <textarea
                    placeholder="Task Details"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                  <Add
                    titleValue={title}
                    descriptValue={description}
                    onAddTask={handleAddTask}
                  />
                </form>
                <div className="todoList">
                  {taskList.length > 0 ? (
                    taskList.map((item, index) => (
                      <Todo
                        key={index}
                        item={item}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        edit={handleEditTask}
                        delete={handleDelete}
                      />
                    ))
                  ) : (
                    <h3>You Don't Have Any Task Yet</h3>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Please LogIn</div>
        )}
      </div>
    </>
  );
}

export default Home;
