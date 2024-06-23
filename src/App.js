import axios from "axios";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Regsiter";
import Home from "./components/home/Home";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://anesa06.pythonanywhere.com/users/me/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if(localStorage.getItem('token')){
      fetchUserData();
    }
  }, []);

  return (
    <div className="App">       
      <Routes>
        <Route path="*" 
        element={<h1 
          style={
            {position:'absolute',
              inset: '50%', transform: 'translate(-50%, -50%)',
              width: '100%', 
              textAlign: 'center', 
              color: 'white'
            }}
            >404 Page Not Found</h1>} />
        {user ? (
          <>
            <Route path={`/${user.username.toLowerCase()}`} element={<Home user={user} />} />
            <Route path="/" element={<Navigate to={`/${user.username.toLowerCase()}`} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login header={user} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
