import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://anesa06.pythonanywhere.com/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      const userResponse = await axios.get(
        "https://anesa06.pythonanywhere.com//users/me/",
        {
          headers: {
            Authorization: `Token ${response.data.token}`,
          },
        }
      );

      const user = userResponse.data;
      setLoginError(true);
      navigate(`/${user.username.toLowerCase()}`);
      window.location.reload();
    } catch (error) {
      console.error("Login ERROR: ", error);
      if (error.response.data.non_field_errors) {
        setLoginError(true);
      } else {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="LoginCont">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h1 className="login">Login</h1>
        {loginError ? <p>Username or Password is incorrect</p> : null}
        <div>
          <input
            id="loginUsername"
            type="text"
            value={username}
            onChange={(e) => handleChange(e, setUsername)}
          />
          <label htmlFor="loginUsername">Your Label</label>
        </div>
        <div>
          <input
            id="loginPassword"
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
          />
          <button
            id="eye"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "😳" : "😌"}
          </button>
          <label htmlFor="loginPassword">Password</label>
        </div>
        <div className="btn-links">
          <Link to="/register">Don't Have Account?</Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
