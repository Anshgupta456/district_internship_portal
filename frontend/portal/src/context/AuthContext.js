import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('id');
    const userProfileId = localStorage.getItem('profileId');
    
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
      setId(userId);
      setProfileId(userProfileId);
    }
  }, []);

  const login = (token, userRole, userId, userProfileId,email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('id', userId);
    localStorage.setItem('profileId', userProfileId);
    localStorage.setItem('email',email)
    setIsAuthenticated(true);
    setRole(userRole);
    setId(userId);
    setProfileId(userProfileId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('profileId');
    setIsAuthenticated(false);
    setRole('');
    setId('');
    setProfileId('');

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, id, profileId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
