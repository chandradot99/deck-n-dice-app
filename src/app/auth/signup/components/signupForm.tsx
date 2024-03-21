'use client'

import AuthService from '@/app/services/authService';
import React, { useState } from 'react';
import Image from "next/image";

interface UserData {
  username: string;
  password: string;
  confirmPassowrd: string;
}

function SignupForm(): JSX.Element {
  const [formData, setFormData] = useState<UserData>({
    username: '',
    password: '',
    confirmPassowrd: ''
  });
  const [error, setError] = useState<string | null>(null);

  const authService = new AuthService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await authService.signup({
        username: formData.username,
        hash_password: formData.password
      });
      console.log('Signup successful:', data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Image
            className="h-30 w-auto rounded-full"
            src="/images/logo.png"
            alt="Deck N Dice"
            width={100}
            height={100}
          />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Create your account in seconds
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
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password webauthn"
                    className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirmPassowrd"
                    type="password"
                    required
                    value={formData.confirmPassowrd}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create an account
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </a>
        </p>

      </div>
    </div>
  )
}

export default SignupForm;
