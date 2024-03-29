import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true')
            setIsLoggedIn(true);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;