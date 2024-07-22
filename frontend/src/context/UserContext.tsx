import React, { ReactNode, createContext, useContext } from "react";

import { useLocalStorage } from "usehooks-ts";

export const useUser = () => useContext(UserContext);

interface User {
  id: User | null;
  _id: string;
  Name: string;
  Email: string;
  Password: string;
  token: string;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (loginResponse: { status: string; token: string; user: User }) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [, setToken] = useLocalStorage<string | null>("token", null);

  const isLoggedIn = !!user;

  const login = (loginResponse: {
    status: string;
    token: string;
    user: User;
  }) => {
    if (loginResponse.status === "success") {
      const { user, token } = loginResponse;
      const sanitizedUser = { ...user, Password: "" };
      setUser(sanitizedUser);
      setToken(token);
    } else {
      console.error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
