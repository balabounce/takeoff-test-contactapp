import React from 'react';
import './App.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
    const { login, logout, userId, userName } = useAuth();
    const isAuthenticated = !!userId;

    return (
        <div className="App">
            <AuthContext.Provider value={{
                login, logout, userId, userName, isAuthenticated
            }}>
                <BrowserRouter>
                    {   isAuthenticated ?
                        <MainPage/>
                        :
                        <AuthPage/>
                    }
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
