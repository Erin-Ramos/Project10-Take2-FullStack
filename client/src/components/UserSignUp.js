import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import ErrorsDisplay from '../components/ErrorsDisplay';
import UserContext from '../context/UserContext';

const UserSignUp = () => {
  // Access sign-in action from UserContext
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // Referencecs to form input fields
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create user object
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };

    // Try to sign-up the user
    try {
      const res = await api("/users", "POST", user);
      if (res.status === 201) {
        console.log(`${user.firstName} is successfully signed up and authenticated!`);
        await actions.signIn(user.emailAddress, user.password); 
        navigate("/");
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors);
      } else { 
        console.log(`Unexpected Error. Status code: ${res.status}`)
        navigate('/Error');
    }
    } catch (error) {
      console.error('Error during sign up', error);
      navigate("/error");
    }
  };

  // Handle cancellation and return to the home page
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <div>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            ref={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            ref={lastName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={password}
          />
          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
      <p>
        Already have a user account? <Link to="/signin">Click Here</Link> to sign in!
      </p>
    </div>
  );
};

export default UserSignUp;
