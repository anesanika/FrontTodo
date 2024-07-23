import axios from "axios";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Regsiter";
import Home from "./components/home/Home";
import Nopage from "./components/404/Nopage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://anesa06.pythonanywhere.com/users/me/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (localStorage.getItem("token")) {
      fetchUserData();
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {localStorage.getItem("token") ? null : (
          <Route path="*" element={<Nopage />} />
        )}
        {user ? (
          <>
            <Route
              path={`/${user.username.toLowerCase()}`}
              element={<Home user={user} />}
            />
            <Route
              path="/"
              element={<Navigate to={`/${user.username.toLowerCase()}`} />}
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login header={user} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
