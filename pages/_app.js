// import { useRouter } from 'next/router';
// import ProtectedRoutes from '../routes/ProtectedRoutes';
// // import { FirebaseAuthContextProvider } from '../contexts/FirebaseAuthContext';
// import { SessionProvider } from "next-auth/react";

// import Navbar from '../components/navbar/Navbar';
// import '../styles/globals.scss';


// const publicPages = ['/', '/login/Login', '/signup/SignUp', '/forgotPassword/ForgotPassword'];

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {

//   const router = useRouter();

//   return (
//     <>
//       <SessionProvider session={session}>
//         <Navbar />
//         {publicPages.includes(router.pathname) ?
//           <Component {...pageProps} /> :
//           <ProtectedRoutes>
//             <Component {...pageProps} />
//           </ProtectedRoutes>
//         }
//       </SessionProvider>
//     </>
//   );
// }

// export default MyApp;

import { SessionProvider } from "next-auth/react";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;