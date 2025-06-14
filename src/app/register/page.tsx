'use client'

import { useState, useMemo, useCallback } from 'react';
import { showError, showSuccess } from '@/lib/toast';
import LoadingAnimation from '@/components/LoadingAnimation';
import { isValidEmail } from '@/lib/validators';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [emailValidationError, setEmailValidationError] = useState(false);

    const getInputClass = useMemo(() => {
        const baseClass = 'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring';
        return {
            emailLabel: `block text-sm mb-1 font-medium ${emailValidationError ? 'text-rose-600 animate-bounce' : 'text-gray-600'}`,
            emailInput: `${baseClass} ${emailValidationError ? 'border-rose-600 focus:ring-rose-600' : 'border-gray-300 focus:ring-blue-500'}`,
            passwordLabel: `block text-sm mb-1 font-medium ${passwordConfirmError ? 'text-rose-600 animate-bounce' : 'text-gray-600'}`,
            passwordInput: `${baseClass} ${passwordConfirmError ? 'border-rose-600 focus:ring-rose-600' : 'border-gray-300 focus:ring-blue-500'}`,
        };
    }, [passwordConfirmError, emailValidationError]);

    const handleBlur = (input: string) => {
        if (input === 'password') {
            if (password && password.length > 5) {
                setPasswordConfirmError(false);
            }
        }

        if (input === 'confirm') {
            if (password && (password === passwordConfirm)) {
                setPasswordConfirmError(false);
            } else {
                setPasswordConfirmError(true);
            }
        }

        if (input === 'email') {
            if (isValidEmail(email)) {
                setEmailValidationError(false);
            } else {
                setEmailValidationError(true);
            }
        }

    }

    const handleRegister = (e: React.FormEvent) => {
        if (!isValidEmail(email)) {
            setEmailValidationError(true);
            return;
        }

        if (!password || password.length < 6 || password !== passwordConfirm) {
            setPasswordConfirmError(true);
            return;
        }

        // implement registration
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-6">
                <h2 className="text-2xl font-semibold text-center">Create Account</h2>

                <div>
                    <label htmlFor="email" className={getInputClass.emailLabel}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={getInputClass.emailInput}
                        aria-invalid={emailValidationError}
                    />
                </div>

                <div>
                    <label htmlFor="password" className={getInputClass.passwordLabel}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPassword(value);
                            setPasswordValid(value.length >= 6);
                        }}
                        onBlur={() => handleBlur('password')}
                        className={getInputClass.passwordInput}
                    />
                    <p className={`text-sm mt-1 px-2 ${passwordValid ? 'text-green-600' : 'text-rose-600'}`}>
                        {passwordValid ? 'Minimum 6 characters' : 'Password must be at least 6 characters'}
                    </p>
                </div>

                <div>
                    <label htmlFor="passwordConfirm" className={getInputClass.passwordLabel}>
                        Password Confirmation
                    </label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={() => handleBlur('confirm')}
                        className={getInputClass.passwordInput}
                        aria-invalid={passwordConfirmError}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account? <a href="/signIn" className="text-blue-600 underline">Sign in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
