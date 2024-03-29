'use client'

import { useAuthContext } from '@/app/context/authContext';
import AuthService from '@/app/services/authService';
import React, { useState } from 'react';

interface UserData {
  username: string;
  password: string;
}

type LoginFormProps = {
  onSignup: () => void,
  onClose: () => void
};

function LoginForm({ onSignup, onClose }: LoginFormProps): JSX.Element {
  const { onLogInSucess } = useAuthContext();

  const [formData, setFormData] = useState<UserData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const authService = new AuthService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await authService.login({
        username: formData.username,
        hash_password: formData.password
      });

      onLogInSucess({
        id: data.user.id,
        name: data.user.name,
        username: data.username,
        biography: data.user.biography,
        dob: data.user.dob,
        gender: data.user.gender,
        email: data.user.email
      });

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center lg:flex-none">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Log into your account in seconds
          </p>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <button onClick={onSignup} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm;
