import './Register.css';
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);
  
  const navigate = useNavigate();

  const getValue = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://anesa06.pythonanywhere.com/users/', {
        username: username, 
        email: email,
        password:password,
      });
      
      console.log('User registered:', response.data);
      navigate('/');
      
    } catch (error) {
      setRegisterError(true)
      console.error('Error registering user:', error);
    }
  };
  

  return (
    <div className='registerDiv'>
      <Helmet>
        <title>Create Account</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h1 className='register'>Register</h1>
        {
          registerError ? 
          <p>This Email Or Username is Alrady existed Try Another</p>
          :
          null
        }
        <div>
          <input id="emailRegistr"
            type="email"
            onChange={(e) => getValue(e, setEmail)}
            value={email}
          />
          <label htmlFor='emailRegistr'>Email</label>
        </div>
        <div>
          <input id='nameRegistr'
            type="text"
            onChange={(e) => getValue(e, setUsername)}
            value={username}
          />
          <label htmlFor='nameRegistr'>Username</label>
        </div>
        <div>
          <input id='passwordRegistr'
            type="password"
            onChange={(e) => getValue(e, setPassword)}
            value={password}
          />
          <label htmlFor='passwordRegistr'>Password</label>
        </div>
        <div className='btn-links'>
          <Link to="/">Alrady Have Account ?</Link>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
