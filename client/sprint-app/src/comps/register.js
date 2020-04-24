import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = e => {
      e.preventDefault();
      setRegister({
          ...register,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
          .post('http://localhost:3300/api/auth/register', register)
          .then((res) => {
              localStorage.setItem('token', res.data.payload);
              history.push('/api/auth/login')
          })
          .catch(err => console.log(err.response));
      setRegister({
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
          value={register.username}
          onChange={handleChange}
        />

        <input 
          type='password'
          name='password'
          placeholder='password'
          value={register.password}
          onChange={handleChange}
        />

        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Register;
