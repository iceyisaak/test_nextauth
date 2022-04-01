import { useState } from 'react';
import { useAuth } from '../../contexts/FirebaseAuthContext';

const ForgotPassword = () => {

  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    requestPasswordReset(email);
    alert('Password is reset');
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