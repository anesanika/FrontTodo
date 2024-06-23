import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import Delete from "./delete/Delete";
import Add from "./add/Add";
import Edit from "./edit/Edit";
import { Helmet } from 'react-helmet-async'

function Home(props) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const LogOut = () =>{
    localStorage.removeItem('token')
    window.location.href = 'https://todosdjango.netlify.app/'
  }

  useEffect(() => {
    const featchTasks = async () =>{
      try{
        const response = await axios.get('https://anesa06.pythonanywhere.com/todo/lists', {
          headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        } 
      )
        setTaskList(response.data);
      } catch(error){
        console.error("Featch Error", error)
      }
    }
    featchTasks();
  }, [])

  
  const handleDelete = (id) => {
    setTaskList(taskList.filter(task => task.id !== id));
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
            <h2>Welcome <span style={{color:'purple'}}>{props.user.username}</span>, Let Be Organized 📝</h2>
            <button onClick={() => LogOut()}>LogOut</button>
          </div>
        </div>
        <div className="todoFrom">
          <div className="todoCont">
            <form>
              <input type="text" placeholder="Task Name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
              <textarea placeholder="Task Detals"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              ></textarea>
              <Add
                titleValue={title}
                descriptValue={description} 
              />
            </form>
            <div className="todoList">
                            
              {
                taskList.length > 0 
                ? 
                taskList.slice().reverse().map((item, index) => (
                  <div className="todos" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <Edit item={item} />
                      <Delete taskId={item.id} onDelete={handleDelete} />
                    </div>
                  </div>
                ))
              :
              <h3>You Don't Have Any Task Yet</h3>
              }
              
            </div>
          </div>
        </div>
        </>
      )
      :
      (
        <div>Please LogIn</div>
      )}

    </div>
    </>
  );
}

export default Home;
