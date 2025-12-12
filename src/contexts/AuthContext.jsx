import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Admin credentials
const ADMIN_CREDENTIALS = {
  id: '1',
  email: 'hradmin@cloudutility.in',
  password: 'hradmin@1234',
  name: 'HR Admin',
  role: 'super_admin',
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedAdmin = localStorage.getItem('admin_session');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual API call to your Node.js backend
    // const response = await fetch('YOUR_API_URL/api/admin/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    
    const isValid = email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
    
    if (isValid) {
      const { password: _, ...adminData } = ADMIN_CREDENTIALS;
      setAdmin(adminData);
      localStorage.setItem('admin_session', JSON.stringify(adminData));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
