import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/FirebaseAuthContext';


const SignInWithSocialMedia = () => {

  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub
  } = useAuth();
  const router = useRouter();

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      router.push('/dashboard/Dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignInWithFacebook = async (e) => {
    e.preventDefault();
    try {
      await signInWithFacebook();
      router.push('/dashboard/Dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignInWithGithub = async (e) => {
    e.preventDefault();
    try {
      await signInWithGithub();
      router.push('/dashboard/Dashboard');
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div>
      <h3>Sign In with Social Media</h3>
      <button onClick={handleSignInWithGoogle}>Google</button>
      <button onClick={handleSignInWithFacebook}>Facebook</button>
      <button >Twitter</button>
      <button onClick={handleSignInWithGithub}>Github</button>
    </div>
  );
};

export default SignInWithSocialMedia;