import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import qrDefault from '../../media/qrDefault.png';
import { useHttp } from '../../hooks/http.hook';
import { Grid, Paper, LinearProgress, Typography } from '@material-ui/core';
import { CompactPicker } from 'react-color'

const QrResult = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QrInput = styled.input`
    border: 2px solid #797D80;
    border-radius: 5px;
    background: none;
    padding: 5px;
    font-size: 20px;
    color: #797D80;
`;

export const QrMainPage = () => {
    const { loading, request } = useHttp();
    const [ qrImage, setQrImage ] = useState(qrDefault);
    const [ firstColor, setFirstColor ] = useState('#000');
    const [ secondColor, setSecondColor ] = useState('#fff');
    const [ text, setText ] = useState('');
    const [ timer, setTimer ] = useState(0);


    const fetchQrImage = () => {
        if (!text) return null;
        clearTimeout(timer);
        const fetchTimer = setTimeout(async () => {
            try {
                const fetched = await request(`/dev/qr/getcode/`, 'POST', { text, firstColor, secondColor });
                setQrImage(fetched.link);
            } catch (e) {}
        },1000);
        setTimer(fetchTimer);
    }

    useEffect(() => {
        document.querySelector('.qr-input').focus();
    }, []);

    useEffect(() => {
        fetchQrImage();
    }, [text, firstColor, secondColor]);

    return (
        <Paper>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }} />
            <Grid container spacing={0} alignItems="center" justify="space-between" style={{ padding: 20 }}>
                <Grid item xl={6} md={6} xs={12}>
                    <QrInput className={"qr-input"} onChange={(e) => setText(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <Grid container spacing={0} alignItems="center" justify="space-between">
                        <div>
                            <Typography variant="subtitle1" gutterBottom >
                                First color
                            </Typography>
                            <CompactPicker color={ firstColor } onChange={ (color) => setFirstColor(color) } />
                        </div>
                        <div>
                            <Typography variant="subtitle1" gutterBottom >
                                Second color
                            </Typography>
                            <CompactPicker  color={ secondColor } onChange={ (color) => setSecondColor(color) } />
                        </div>
                    </Grid>
                    <br/><br/>
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                    <QrResult>
                        <img src={qrImage} alt=""/>
                    </QrResult>
                </Grid>
            </Grid>
        </Paper>
    );
}