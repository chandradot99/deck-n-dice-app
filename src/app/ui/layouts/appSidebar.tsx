'use client';

import React from 'react';
import {
  BookOpenIcon,
  NewspaperIcon,
  PlayIcon,
  TvIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import AuthService from '@/app/services/authService';
import AuthModal, { AuthType } from '../modals/authModal';
import { useAuthContext } from '@/app/context/authContext';
import authService from '@/app/services/authService';

const navigation = [
  { name: 'Play', icon: PlayIcon, count: '5', current: true },
  { name: 'Learn', icon: BookOpenIcon, current: false },
  { name: 'Watch', icon: TvIcon, count: '12', current: false },
  { name: 'News', icon: NewspaperIcon, count: '20+', current: false },
  { name: 'Social', icon: UsersIcon, current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AppSidebar() {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const { authState, onLogInSucess } = useAuthContext();

  const verifyToken = React.useCallback(async () => {
    const authService = new AuthService();
    const token = authService.getToken();

    if (token) {
      try {
        const data = await authService.verifyToken(token);
  
        onLogInSucess({
          id: data.user.id,
          name: data.user.name,
          username: data.username,
          biography: data.user.biography,
          dob: data.user.dob,
          gender: data.user.gender,
          email: data.user.email
        });
  
      } catch (error) {
        authService.logout();
      }
    }
  }, [onLogInSucess]);

  React.useEffect(() => {
    if (!authState.isLoggedIn) {
      verifyToken();
    }
  }, [authState.isLoggedIn, verifyToken]);

  return (
    <div className="flex grow flex-col gap-y-5 bg-[#262521] px-5 h-full w-[200px]">
      <div className="flex h-40 shrink-0 items-center justify-center">
        <Image
          className="h-24 w-auto rounded-full"
          src="/images/logo.png"
          alt="Deck N Dice"
          width={128}
          height={128}
          priority
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    className={classNames(
                      item.current ? 'bg-[#1F1E1E] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1F1E1E]',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto mb-4">
            {
              authState.isLoggedIn ? (
                <div
                  className="flex items-center p-2 rounded-md gap-x-3 text-sm font-semibold leading-6 text-white hover:bg-[#1F1E1E]"
                >
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <span aria-hidden="true">{authState.user?.username}</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="rounded-md w-full bg-[#81B64B] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#A2D05F] bottom-0"
                  onClick={() => setOpenAuthModal(true)}
                >
                  Login
                </button>                
              )
            }
          </li>
        </ul>
      </nav>


      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} authType={AuthType.login}></AuthModal>
    </div>
  )
}
