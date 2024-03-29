import React from 'react';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  biography: string;
  dob: string;
  gender: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export type AuthContextType = {
  authState: AuthState;
  onLogInSucess: (user: User) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  authState: { user: null, isLoggedIn: false },
  onLogInSucess: () => {}
});

export function useAuthContext() {
  return React.useContext(AuthContext);
}

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>({ user: null, isLoggedIn: false });

  const onLogInSucess = (user: User) => {
    setAuthState({
      user,
      isLoggedIn: true
    })
  };


  return <AuthContext.Provider value={{ authState, onLogInSucess }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
