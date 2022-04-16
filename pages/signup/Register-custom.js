import React from 'react';
import { useRouter } from 'next/router';
import { getProviders, signIn, getCsrfToken, getSession, newUser } from "next-auth/react";


const RegEmailPass = ({ csrfToken, providers }) => {

  const router = useRouter();

  const signUpUser = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch('/api/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    let data = await res.json();
    if (data.message) setMessage(data.message);
    if (data.message === 'Registered Successfully!') {
      let options = { redirect: false, email, password };
      const res = await signIn("credentials", options);
      if (res?.error) setMessage(res.error);
      return router.push('/');
    }
  };


  return (
    <form>
      SignUp
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <p style={{ color: 'red' }}>{message}</p>

      <button onClick={(e) => signUpUser(e)}>
        Sign up with Email & Password
      </button>

      <button onClick={() => router.push('/login/Login')}>
        Login
      </button>

    </form>
  );
};

export default RegEmailPass;