import { useContext } from 'react';
import { AuthContext } from 'providers/auth/authProvider';
export const useAuth = () => {
  return useContext(AuthContext);
};
