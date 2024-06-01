import { useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);

  // State
  const emailAddress = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.signIn(emailAddress.current.value, password.current.value);
    navigate("/");
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            id="emailAddress"
            required
            type="text"
            ref={emailAddress}
            placeholder="Email Address" />
          <input
            id="password"
            required
            type="password"
            ref={password}
            placeholder="Password" />

            <button className="button" type="submit">Sign In</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to={'/signup'}>sign up</Link>!</p>

      </div>
    </main>
  )
}
  export default UserSignIn;
