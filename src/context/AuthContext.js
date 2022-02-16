import { createContext } from "react";

const foo = () => {};

export const AuthContext = createContext({
    id: null,
    userName: null,
    login: foo,
    logout: foo,
    isAuthenticated: false
});
