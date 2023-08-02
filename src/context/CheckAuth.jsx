import { createContext } from 'react';
import { useState } from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children}) => {
  const [checkAuth, setCheckAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ checkAuth, setCheckAuth }}>
      {children}
    </AuthContext.Provider>
  );
};