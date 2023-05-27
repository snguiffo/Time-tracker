import { userAtom } from '../states/userAtom';
import { authAtom } from '../states/authAtom'

export const login = async (email, password) => {

    const BASE_URL = (process.env.BASE_URL)?process.env.BASE_URL:"http://localhost:3000";
  // Make API call to the backend to authenticate the user
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const {user, accessToken } = await response.json();

    // Update the authAtom state with the JWT token
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    //authAtom.set(accessToken);
    //userAtom.set(user);

    return true;
  }

  throw new Error('Invalid credentials');
};

export const logout = () => {
  // Remove the JWT token from the authAtom state
  localStorage.removeItem('accessToken');
  authAtom.set(null);
  
  localStorage.removeItem('user');
  userAtom.set(null);
};
