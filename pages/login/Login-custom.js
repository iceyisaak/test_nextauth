import { useState } from 'react';
import { useRouter } from 'next/router';
import { getProviders, signIn, getCsrfToken, getSession } from "next-auth/react";

export default function SignIn({ csrfToken, providers }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const router = useRouter();

  const signInUser = async (e) => {
    e.preventDefault();
    let options = { redirect: false, email, password };
    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) setMessage(res.error);
    console.log(res);
    console.log(email, password);
    // return router.push('/');
  };


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
      // return router.push('/');

    }
  };


  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>

      <form action="">
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
        <button onClick={(e) => signInUser(e)}>
          Sign in with Email & Password
        </button>
        <button onClick={(e) => signUpUser(e)}>
          Sign up with Email & Password
        </button>
      </form>

      {
        Object.values(providers).map((provider) => {
          if (provider.name === "Email" || provider.name === "Credentials") return;
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })
      }
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    // Signed in
    return {
      redirect: {
        destination: '/'
      }
    };

  }

  return {
    props: { csrfToken, providers },
  };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/