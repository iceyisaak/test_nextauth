import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/FirebaseAuthContext';


const ProtectedRoutes = ({ children }) => {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login/Login');
    }
  }, [router, user]);


  return (
    <>
      {user ? children : null}
    </>
  );
};

export default ProtectedRoutes;