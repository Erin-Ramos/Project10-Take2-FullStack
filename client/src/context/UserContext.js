import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const signInUser = async (credentials) => {
        try {
            const res = await fetch('http://localhost:5000/api/users');
            res = await res.json();
            setUser(res);
        } catch (err) {
            console.error('Sign In Failed', err);
            throw err;
        }
    };

    const signOutUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{
            user,
            actions: {
                signIn: signInUser,
                signOut: signOutUser
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;