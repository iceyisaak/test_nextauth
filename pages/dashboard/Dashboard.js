import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/FirebaseAuthContext';

const Dashboard = () => {

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login/Login');
  };

  return (
    <div>
      <h1>
        Dashboard
      </h1>
      <p>
        Hi <span>{user.email}</span>
      </p>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
};

export default Dashboard;