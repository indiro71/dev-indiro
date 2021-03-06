import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '@indiro/layout';
import { useRoutes } from './routes';
import LeftMenu from './template/LeftMenu';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { LinearProgress } from '@material-ui/core';

function App() {
    const { token, login, logout, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <LinearProgress/>;
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            <Router>
                <Layout content={routes} leftMenu={LeftMenu}/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
