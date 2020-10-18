import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { QrMainPage } from './pages/qrcode/QrMainPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { DetailSettingPage } from './pages/settings/DetailSettingPage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <MainPage/>
            </Route>
            <Route path={'/qr'} exact>
                <QrMainPage/>
            </Route>
            <Route path={'/settings'} exact>
                <SettingsPage/>
            </Route>
            <Route path={"/settings/:id"}>
                <DetailSettingPage />
            </Route>

            <Redirect to={'/create'}/>
        </Switch>
    );
}