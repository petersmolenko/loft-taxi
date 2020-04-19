import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

const AuthContext = React.createContext(null);

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = (email, password) => {
        setIsLoggedIn(true);
        console.log(`User ${email} is authorized.`);
    };
    const logout = () => setIsLoggedIn(false);
    const { children } = props;

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const AuthHOC = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
        {(contextProps) => (
            <>
                {contextProps.isLoggedIn ? (
                    <WrappedComponent {...contextProps} {...props} />
                ) : (
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        style={{ flexGrow: 1 }}
                    >
                        <Typography
                            variant="h3"
                            component="h3"
                            style={{ color: "#ffc617" }}
                        >
                            The user is not logged in:(
                        </Typography>
                    </Grid>
                )}
            </>
        )}
    </AuthContext.Consumer>
);

export { AuthContext, AuthProvider, AuthHOC };
