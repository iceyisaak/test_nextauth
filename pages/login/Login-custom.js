import { useState } from 'react';
import { getProviders, signIn, getCsrfToken, getSession } from "next-auth/react";

export default function SignIn({ csrfToken, providers }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const signInUser = (e) => {
    e.preventDefault();
    console.log('email', 'password');
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
        <button onClick={(e) => signInUser(e)}>
          Sign in with Email & Password
        </button>
      </form>

      {
        Object.values(providers).map((provider) => {
          if (provider.name === "Email") return;

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