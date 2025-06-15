'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { showError, showSuccess } from '@/lib/toast';
import LoadingAnimation from '@/components/LoadingAnimation';
import FormInput from '@/components/ui/FromInput';
import { isValidEmail } from '@/lib/validators';

const Register = () => {
  const { user, isInitialized } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isInitialized && user) {
      push('/dashboard');
    }
  }, [user, isInitialized, push]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);

  const handleBlur = (input: 'password' | 'confirm' | 'email') => {
    if (input === 'password') {
      setPasswordValid(password.length >= 6);
    }
    if (input === 'confirm') {
      setPasswordConfirmError(password !== passwordConfirm);
    }
    if (input === 'email') {
      setEmailValidationError(!isValidEmail(email));
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailValidationError(true);
      return;
    }

    if (!password || password.length < 6 || password !== passwordConfirm) {
      setPasswordConfirmError(true);
      return;
    }

    setIsSubmitting(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showSuccess('Account created!');
        push('/dashboard');
      })
      .catch((error) => showError(error.message || 'Failed to register'))
      .finally(() => setIsSubmitting(false));
    // @todo - send user to update profile with name, account and phonenumber
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      {!isInitialized || isSubmitting ? (
        <LoadingAnimation overlay={false} size={100} className="my-6" />
      ) : (
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Create Account</h2>

          <FormInput
            id="email"
            type="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
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
              const value = e.target.value;
              setPassword(value);
              setPasswordValid(value.length >= 6);
            }}
            onBlur={() => handleBlur('password')}
            error={!passwordValid}
            helperText={
              password.length > 0
                ? passwordValid
                  ? 'Minimum 6 characters'
                  : 'Password must be at least 6 characters'
                : undefined
            }
            autoComplete="new-password"
          />

          <FormInput
            id="passwordConfirm"
            type="password"
            label="Password Confirmation"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={() => handleBlur('confirm')}
            error={passwordConfirmError}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={handleRegister}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-600 underline cursor-pointer"
              onClick={() => push('/signIn')}
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
