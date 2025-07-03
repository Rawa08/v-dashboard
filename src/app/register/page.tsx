'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { showError, showSuccess } from '@/lib/toast';
import LoadingAnimation from '@/components/LoadingAnimation';
import FormInput from '@/components/ui/FromInput';
import { isValidEmail, isPhoneValid } from '@/lib/validators';
import fetchWithAuth from '@/lib/fetchWithAuth';

const Register = () => {
  const { user, isInitialized } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isInitialized && user) {
      push('/dashboard');
    }
  }, [user, isInitialized, push]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [phoneValidationError, setPhoneValidationError] = useState(false);

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
    if (value?.length) {
      setPhoneValidationError(!isPhoneValid(value));
    } else {
      setPhoneValidationError(false);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailValidationError(!isValidEmail(value));
  };

  const handleBlur = (input: 'password' | 'confirm' | 'email' | 'phone') => {
    if (input === 'password') {
      setPasswordValid(password.length >= 6);
    }
    if (input === 'confirm') {
      setPasswordConfirmError(password !== passwordConfirm);
    }
    if (input === 'email') {
      setEmailValidationError(!isValidEmail(email));
    }
    if (input === 'phone' && phoneNumber?.length > 0) {
      setPhoneValidationError(!isPhoneValid(phoneNumber));
    }
  };

  const handleUserRegistration = (fireBaseUid: string): void => {
    fetchWithAuth('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        firebaseUid: fireBaseUid,
        firstName,
        lastName,
        phoneNumber,
        email,
      }),
    });
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
      .then(({ user }) => {
        handleUserRegistration(user.uid);
        showSuccess('Account created!');
        push('/dashboard');
      })
      .catch((error) => showError(error.message || 'Failed to register'))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {!isInitialized || isSubmitting ? (
        <LoadingAnimation overlay={false} size={100} className="my-6" />
      ) : (
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Create Account</h2>
          <FormInput
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <FormInput
            id="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <FormInput
            id="phone"
            label="Phone number"
            value={phoneNumber}
            onChange={onPhoneChange}
            onBlur={() => handleBlur('phone')}
            error={phoneValidationError}
            helperText={'Provide a valid Phone number e.g., +46701234567'
            }
          />

          <FormInput
            id="email"
            type="email"
            label="Email *"
            required
            value={email}
            onChange={onEmailChange}
            onBlur={() => handleBlur('email')}
            error={emailValidationError}
            autoComplete="email"
          />

          <FormInput
            id="password"
            type="password"
            label="Password *"
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
              password.length > 0 ? 'Minimum 6 characters'
                : 'Password must be at least 6 characters'
            }
            autoComplete="new-password"
          />

          <FormInput
            id="passwordConfirm"
            type="password"
            label="Password Confirmation *"
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
