import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://anesa06.pythonanywhere.com/login/', {
        username,
        password
      });

      localStorage.setItem('token', response.data.token)

      const userResponse = await axios.get('https://anesa06.pythonanywhere.com//users/me/', {
        headers: {
          'Authorization': `Token ${response.data.token}`
        }
      });

      const user = userResponse.data;
      setLoginError(true);
      window.location.href = `https://todosdjango.netlify.app/${user.username.toLowerCase()}`;
      } catch (error) {
        setLoginError(true);
        console.error('Login ERROR <3:', error);
      }
  };
  
  return (
    <div className="LoginCont">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h1 className="login">Login</h1>
        {
          loginError ? 
          <p>Username or Password is incorrect</p>
          :
          null
        }
        <div>
          <input id="loginUsername" type="text" value={username} 
            onChange={(e) => handleChange(e, setUsername)} 
          />
          <label htmlFor="loginUsername">Your Label</label>
        </div>
        <div>
          <input id="loginPassword" type="password" value={password} 
            onChange={(e) => handleChange(e, setPassword)} 
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <div className="btn-links">
          <Link to="/register">Don't Have Account?</Link>
          <button type="submit" >Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
