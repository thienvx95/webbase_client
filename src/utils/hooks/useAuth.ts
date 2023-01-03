import { useContext } from 'react';
import { AuthContext } from 'providers/authProvider';
export const useAuth = () => {
  return useContext(AuthContext);
};
