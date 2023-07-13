import { useState, createContext, useContext, useEffect } from "react";
import { OAuthCredential, User } from "firebase/auth";
import { getAuth } from "firebase/auth";

interface AuthContextProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface AuthContextType {
  user: User | null;
  credentials: OAuthCredential | null;
  setUserCredentials: (credentials: OAuthCredential | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: User | null) => {},
  credentials: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserCredentials: (credentials: OAuthCredential | null) => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [credentials, setUserCredentials] = useState<OAuthCredential | null>(
    null
  );

  useEffect(() => {
    void getUser();
  }, [getAuth().currentUser]);

  const getUser = () => {
    const user = getAuth().currentUser;
    if (!user) return;
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, credentials, setUserCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
