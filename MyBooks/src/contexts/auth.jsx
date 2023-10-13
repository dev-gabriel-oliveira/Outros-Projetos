import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //Login
    const signin = (email, username) => {
        setUser({email, username});
        localStorage.setItem("user", JSON.stringify({email: email, username: username}));
        return;
    }

    //Logout
    const signout = () => {
        setUser(null);
        localStorage.setItem("user", null);
        return;
    }

    useEffect(() => {
        const userSaved = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            setUser(userSaved);
        }
    });

    return (
        <AuthContext.Provider
            value={{ user, signed: user, signout, signin }}
        >
            {children}
        </AuthContext.Provider>
    );
};