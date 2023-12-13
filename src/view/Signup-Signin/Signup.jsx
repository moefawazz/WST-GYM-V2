import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext.js';
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/home')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='p-[1.5rem] min-h-screen flex flex-col justify-center'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account yet?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder="Enter Your Email"
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder="Enter Your Password"
          />
        </div>
        <div className="my-4">
          <Button title="Sign Up" width="w-full" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
