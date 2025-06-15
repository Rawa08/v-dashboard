'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail } from '@/lib/validators';
import { showError, showSuccess } from '@/lib/toast';
import FormInput from '@/components/ui/FromInput';

const ForgotPassword = () => {

    const { push } = useRouter();
    const { user, isInitialized } = useAuth();

    useEffect(() => {
        if (isInitialized && user) {
            push('/dashboard');
        }
    }, [user, isInitialized, push]);

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError(true);
            return;
        }

        setIsSubmitting(true);
        // @todo: Implement custom password reset flow with a dedicated reset page (e.g. /reset).
        // This requires sending actionCodeSettings with `handleCodeInApp: true` to sendPasswordResetEmail.
        // For now, we use Firebase's default hosted reset page.
        sendPasswordResetEmail(auth, email)
            .then(() => {
                showSuccess('Password reset email sent!');
                push('/signIn');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    showError('No user found with that email.');
                } else {
                    showError(error.message || 'Failed to send reset email.');
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
                <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

                <FormInput
                    id="email"
                    type="email"
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailError(!isValidEmail(email))}
                    error={emailError}
                    autoComplete="email"
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Send Reset Link
                </button>

                <p className="text-center text-sm text-gray-500">
                    Remembered your password?{' '}
                    <button
                        type="button"
                        className="text-blue-600 underline cursor-pointer"
                        onClick={() => push('/signIn')}
                    >
                        Back to Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
