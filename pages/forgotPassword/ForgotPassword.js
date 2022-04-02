import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/FirebaseAuthContext';

const ForgotPassword = () => {

  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleResetPassword = (e) => {
    e.preventDefault();
    requestPasswordReset(email);
    alert('Password is reset');
    router.push('/login/Login');
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h1>
        Send Password Reset Email
      </h1>
      <label htmlFor="email">Email</label>
      <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button>Reset Password</button>
    </form>
  );
};

export default ForgotPassword;