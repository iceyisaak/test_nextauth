import { useRouter } from 'next/router';
import ProtectedRoutes from '../routes/ProtectedRoutes';
import { FirebaseAuthContextProvider } from '../contexts/FirebaseAuthContext';

import Navbar from '../components/navbar/Navbar';
import '../styles/globals.scss';


const publicPages = ['/', '/login/Login', '/signup/SignUp', '/forgotPassword/ForgotPassword'];

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (
    <FirebaseAuthContextProvider>
      <Navbar />
      {publicPages.includes(router.pathname) ?

        <Component {...pageProps} /> :

        <ProtectedRoutes>
          <Component {...pageProps} />
        </ProtectedRoutes>
      }
    </FirebaseAuthContextProvider>
  );
}

export default MyApp;