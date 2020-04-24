import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = e => {
      e.preventDefault();
      setLogin({
          ...login,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
          .post('http://localhost:3300/api/auth/login', login)
          .then((res) => {
              localStorage.setItem('token', res.data.payload);
              history.push('/api/jokes')
          })
          .catch(err => console.log(err.response));
      setLogin({
        username: '', 
        password:''
      })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='username'
          value={login.username}
          onChange={handleChange}
        />

        <input 
          type='password'
          name='password'
          placeholder='password'
          value={login.password}
          onChange={handleChange}
        />

        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
