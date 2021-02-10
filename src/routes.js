import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { QrMainPage } from './pages/qrcode/QrMainPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { DetailSettingPage } from './pages/settings/DetailSettingPage';
import { AuthPage } from './pages/AuthPage';
import { LinkList } from './pages/links/LinkList';
import { AddLinkPage } from './pages/links/AddLinkPage';
import { NoteDetailPage } from './pages/notes/NoteDetailPage';
import { NoteMainPage } from './pages/notes/NoteMainPage';
import { InstagramMainPage } from './pages/instagram/InstagramMainPage';
import { InstagramDetailPage } from './pages/instagram/InstagramDetailPage';
import { InstagramAddPage } from './pages/instagram/InstagramAddPage';
import { SlackMainPage } from './pages/slack/SlackMainPage';
import { TagsMainPage } from './pages/tags/TagsMainPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={'/'} exact>
                    <MainPage/>
                </Route>
                <Route path={'/qr'} exact>
                    <QrMainPage/>
                </Route>
                <Route path={'/links'} exact>
                    <LinkList/>
                </Route>
                <Route path={'/links/add'} exact>
                    <AddLinkPage/>
                </Route>
                <Route path={'/notes'} exact>
                    <NoteMainPage/>
                </Route>
                <Route path={'/notes/add'} exact>
                    <NoteDetailPage/>
                </Route>
                <Route path={'/notes/edit/:id'} exact>
                    <NoteDetailPage/>
                </Route>
                <Route path={'/settings'} exact>
                    <SettingsPage/>
                </Route>
                <Route path={"/settings/:id"}>
                    <DetailSettingPage/>
                </Route>
                <Route path={'/instagram'} exact>
                    <InstagramMainPage/>
                </Route>
                <Route path={'/instagram/add'} exact>
                    <InstagramAddPage/>
                </Route>
                <Route path={"/instagram/:name"}>
                    <InstagramDetailPage/>
                </Route>
                <Route path={'/slack'} exact>
                    <SlackMainPage/>
                </Route>
                <Route path={'/tags'} exact>
                    <TagsMainPage/>
                </Route>

                <Redirect to={'/'}/>
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path={'/'} exact>
                    <MainPage/>
                </Route>
                <Route path={'/qr'} exact>
                    <QrMainPage/>
                </Route>
                <Route path={'/links'} exact>
                    <LinkList/>
                </Route>
                <Route path={'/notes'} exact>
                    <NoteMainPage/>
                </Route>
                <Route path={'/auth'} exact>
                    <AuthPage/>
                </Route>
                <Route path={'/instagram'} exact>
                    <InstagramMainPage/>
                </Route>
                <Route path={"/instagram/:name"}>
                    <InstagramDetailPage/>
                </Route>
                <Route path={'/slack'} exact>
                    <SlackMainPage/>
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        );
    }
}