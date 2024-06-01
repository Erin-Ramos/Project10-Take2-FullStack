import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from '../utils/apiHelper';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    const signIn = async (emailAddress, password) => {
        const res = await api("/users", "GET", { emailAddress, password });

        console.log(res.status)

        if (res.status === 200) {
            const user = await res.json();
            setAuthUser(user);
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
            return user
        } else if (res.status === 401) {
            return null
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    }

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
}

export default UserContext;