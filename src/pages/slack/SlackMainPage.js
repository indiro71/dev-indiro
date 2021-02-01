import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHttp } from '../../hooks/http.hook';
import { Grid, Paper, LinearProgress, Typography } from '@material-ui/core';
import OauthPopup from 'react-oauth-popup';
const { WebClient } = require('@slack/web-api');

const Client = styled.div`
    border: 2px solid green;
    padding: 5px;
    margin: 10px 0;
`;

const Server = styled.div`
    border: 2px solid red;
    padding: 5px;
    margin: 10px 0;
`;

const QrInput = styled.input`
    border: 2px solid #797D80;
    border-radius: 5px;
    background: none;
    padding: 5px;
    font-size: 20px;
    color: #797D80;
`;

// const corsEvery = 'https://cors-anywhere.herokuapp.com/';
const corsEvery = 'https://eapps-cs.herokuapp.com/';
const appUrl = window.location.origin + '/slack';
const authUrl = `https://slack.com/oauth/v2/authorize?client_id=1665028273046.1696509842752&scope=channels:history,chat:write,chat:write.customize,chat:write.public,channels:read&user_scope=channels:history&redirect_uri=${appUrl}`
// const authUrl = `https://slack.com/oauth/v2/authorize?client_id=1665028273046.1696509842752&scope=channels:history,chat:write,chat:write.customize,chat:write.public,channels:read&user_scope=channels:history&redirect_uri=https://slack.com/`

const myPersonalToken = 'xoxp-1665028273046-1668718053989-1665908442438-f43b3a72d13b41592807ea8e054d8d26';
const myBotToken = 'xoxb-1665028273046-1665908470230-HZp8rZ8k4bBQw1xOvJFRZiyW';


export const SlackMainPage = (props) => {
    const { loading, request } = useHttp();

    const [personalToken, setPersonalToken] = useState(localStorage.getItem('slackPersonalToken') || '');
    const [botToken, setBotToken] = useState(localStorage.getItem('slackBotToken') || '');

    const [channel, setChannel] = useState(localStorage.getItem('slackChannel') || '');
    const [fetchedChannels, setFetchedChannels] = useState([]);
    const [thread, setThread] = useState(localStorage.getItem('slackThread') || '');
    const [name, setName] = useState(localStorage.getItem('slackUserName') || '');
    const [localName, setLocalName] = useState('Client');
    const [text, setText] = useState('');



    let search = window.location.search;
    let params = new URLSearchParams(search);
    let codeinPath = params.get('code');

    const client_id = '1665028273046.1696509842752';
    const client_secret = 'ecd6c79a6dd7c3673fedc0169ecd7e98';

    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!thread || !personalToken || !channel) return undefined;

        fetchThread();
    }, []);

    useEffect(() => {
        if (!botToken) return undefined;

        fetchChannels();
    }, [botToken]);

    useEffect(() => {
        let canceled = false;
        let update;
        if (botToken && personalToken && channel && thread) {
            update = setInterval(async () => {
                if(!canceled) {
                    await fetchThread();
                }

            }, 5000);
        }

        // return canceled = true;
    }, [botToken, personalToken, channel, thread]);


    const getToken = async (code) => {
        if (!code) return undefined;

        if (codeinPath) {
            setTimeout(() => {
                window.close()
            });
        }

        try {
            const data = await new WebClient().oauth.v2.access({
                client_id,
                client_secret,
                code,
                redirect_uri: appUrl
            })

            setCookiePersonalToken(data.authed_user.access_token);
            setCookieBotToken(data.access_token);

        } catch (e) {
            console.log(e);
        }
    }

    const fetchChannels = async () => {
        try {
            const fetched = await request(corsEvery + `https://slack.com/api/conversations.list?pretty=1`, 'GET', null, {}, 'Bearer ' + botToken);
            setFetchedChannels(fetched.channels)
        } catch (e) {
            console.log(e);
        }
    }

    const fetchThread = async (newThread) => {
        try {
            const fetched = await request(corsEvery + `https://slack.com/api/conversations.replies?channel=${channel}&ts=${thread || newThread}&pretty=1`, 'GET', null, {}, 'Bearer ' + personalToken);
            setMessages(fetched.messages)
        } catch (e) {
            console.log(e);
        }
    }

    const setCookieChannel = (channel) => {
        localStorage.setItem('slackChannel', channel);
        setChannel(channel);
    }

    const setCookieThread = (thread) => {
        localStorage.setItem('slackThread', thread);
    }

    const setCookieName = (name) => {
        localStorage.setItem('slackUserName', name);
    }

    const setCookiePersonalToken = (token) => {
        localStorage.setItem('slackPersonalToken', token);
        setPersonalToken(token);
    }

    const setCookieBotToken = (token) => {
        localStorage.setItem('slackBotToken', token);
        setBotToken(token);
    }

    const sendMe = () => {
        setCookieBotToken(myBotToken)
        setCookiePersonalToken(myPersonalToken);
    }

    const sendMessage = async () => {
        try {
            const fetched = await request(
                corsEvery + `https://slack.com/api/chat.postMessage?channel=${channel}&text=${text}&thread_ts=${thread}&username=${name || localName}&pretty=1`,
                'POST',
                null, {},
                'Bearer ' + botToken);
            setText('');

            if (!thread) {
                setCookieThread(fetched.ts);
                setThread(fetched.ts);
            }

            if (!name) {
                setCookieName(localName);
                setName(localName);
            }

            await fetchThread(fetched.ts);
        } catch (e) {
            console.log(e);
        }
    }

    const onCode = async (code, params) => {
        await getToken(code);
    }

    function Comp() {
        return (
            <OauthPopup
                url={authUrl}
                onCode={onCode}
                onClose = {() => {}}
            >
                <button>Auth in slack</button>
            </OauthPopup>
        );
    }

    if (codeinPath) {
        return '';
    }

    return (
        <Paper>
            {/*<LinearProgress style={{ opacity: loading ? 1 : 0 }} />*/}
            <Grid container spacing={0} alignItems="center" justify="space-between" style={{ padding: 20 }}>

                {!botToken && <div>
                    {/*<p><a href={authUrl}><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a></p>*/}

                    {Comp()}
                    <p>or</p>
                    <button onClick={sendMe}>Send message to me</button>
                </div>}

                {!channel && <div>
                    {fetchedChannels?.length > 0 && fetchedChannels.map((channel, index) => {
                        return (
                            <div key={index} onClick={() => setCookieChannel(channel.id)}>{channel.name}</div>
                        );
                    })}
                </div>}

                {botToken && channel && <div>
                    <Grid item xl={6} md={6} xs={12}>
                        {!name && <div>
                            <QrInput onChange={(e) => setLocalName(e.target.value)} placeholder="your name" className={"qr-input"} />
                        </div>}

                        <QrInput value={text} onChange={(e) => setText(e.target.value)} placeholder="message" className={"qr-input"} />
                        <button onClick={() => sendMessage()}>Send</button>
                    </Grid>
                </div>}


                <Grid item xl={6} md={6} xs={12}>
                    {messages?.length > 0 && messages.map((message, index) => {
                        if (message?.bot_id) {
                            return (
                                <Client key={index}>
                                    <div>{message.username}</div>
                                    <div>{message.text}</div>
                                </Client>
                            );
                        } else {
                            return (
                                <Server key={index}>
                                    <div>Tech support</div>
                                    <div>{message.text}</div>
                                </Server>
                            );
                        }
                    })}
                </Grid>
            </Grid>

            <button onClick={() => {
                localStorage.clear('slackPersonalToken');
                localStorage.clear('slackBotToken');
                localStorage.clear('slackChannel');
                localStorage.clear('slackThread');
                localStorage.clear('slackUserName');
                window.location.reload();
            }}>clear cache</button>
        </Paper>
    );
}