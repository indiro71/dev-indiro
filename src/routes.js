import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { QrMainPage } from './pages/qrcode/QrMainPage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <MainPage/>
            </Route>
            <Route path={'/qr'} exact>
                <QrMainPage/>
            </Route>

            <Redirect to={'/create'}/>
        </Switch>
    );
}