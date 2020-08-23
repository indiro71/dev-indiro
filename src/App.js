import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import Layout from './template/Layout'


function App() {
    const routes = useRoutes();
    return (
        <Router>
            <Layout>
                <div className="App">
                    {routes}
                </div>
            </Layout>
        </Router>
    );
}

export default App;
