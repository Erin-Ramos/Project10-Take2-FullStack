// TODO: PULLED FROM REACT-CONTEXT FILE - NOT READY

import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const UserSignOut = () => {
  // Access sign-out action from UserContext
  const { actions } = useContext(UserContext);

  // Sign-out and return to home page
  useEffect(() => actions.signOut());
  return (
    <Navigate to="/" replace />
  );
};

export default UserSignOut;