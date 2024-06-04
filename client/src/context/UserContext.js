import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from '../utils/apiHelper';

// Create a UserContext with a default value of null
const UserContext = createContext(null);

// UserProvider component to manage user authentication state
export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    // Function to handle user sign-in
    const signIn = async (emailAddress, password) => {
        try {
            const res = await api("/users/", "GET", null, { emailAddress, password });
            if (res.status === 200) {
                const user = await res.json();
                user.password = password;
                setAuthUser(user);
                Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
                return user;
            } else if (res.status === 401) {
                return null;
            } else {
                throw new Error('Sign In Failed');
            }
        } catch (err) {
            console.error('Sign In Failed', err);
            throw err;
        }
    };

    // Function to handle user sign-out
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    };

    // Provide the authUser state and authentication actions to children components
    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
