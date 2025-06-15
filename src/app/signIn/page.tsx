'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { isValidEmail } from '@/lib/validators';
import { showError, showSuccess } from '@/lib/toast';
import LoadingAnimation from '@/components/LoadingAnimation';
import FormInput from '@/components/ui/FromInput';

const SignIn = () => {
  const { push } = useRouter();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && user) {
      push('/dashboard');
    }
  }, [user, isInitialized, push]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailValidationError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showSuccess('Welcome back!');
        push('/dashboard');
      })
      .catch((error) => {
        const code = error.code;
        if (code === 'auth/user-not-found') {
          showError('No user found with that email');
        } else if (code === 'auth/wrong-password') {
          showError('Incorrect password');
          setPasswordError(true);
        } else if (code === 'auth/too-many-requests') {
          showError('Too many attempts. Please try again later.');
        } else {
          showError(error.message || 'Failed to sign in');
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      {!isInitialized || isSubmitting ? (
        <LoadingAnimation overlay={false} size={100} className="my-6" />
      ) : (
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>

          <FormInput
            id="email"
            type="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailValidationError(!isValidEmail(email))}
            error={emailValidationError}
            autoComplete="email"
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError ? 'password is required' : ''}
          />

          <button
            type="button"
            onClick={handleSignIn}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-blue-600 underline cursor-pointer"
              onClick={() => push('/register')}
            >
              Create Account
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
