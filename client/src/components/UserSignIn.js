import { useRef, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const UserSignIn = () => {
  
  // Access sign in action from UserContext
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailAddress = useRef(null);
  const password = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // reset the error
    try {
      const user = await actions.signIn(emailAddress.current.value, password.current.value);
      if (user) {
        navigate("/");
      } else {
        // Notify user of incorrect username or password and allow them to try again
        setError("Username or password is incorrect");
      }
    } catch (err) {
      setError("Username or password is incorrect");
      console.error("Sign in error", err);
    }
  };

  // Handle cancellation and return to home page
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            required
            type="text"
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            required
            type="password"
            ref={password}
          />
          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to={'/signup'}>sign up</Link>!</p>
      </div>
    </main>
  );
};

export default UserSignIn;
