import React, { useState } from 'react';
import styled from 'styled-components'
import { Loader } from '../../components/Loader';
import qrDefault from '../../media/qrDefault.png';
import { useHttp } from '../../hooks/http.hook';

const QrContainer = styled.div`
    max-width: 800px;
    min-height: 300px;
    margin: auto;
    border: 2px solid #797D80;
    border-radius: 15px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`;

const QrContent = styled.div`
    width: 60%;
    height: 100%;
    padding: 30px;
`;

const QrResult = styled.div`
    width: 40%;
    height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QrSeparator = styled.div`
    height: 100%;
    position: relative;
`;

const QrLoader = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #797D80;
    margin-top: -20px;
    box-sizing: border-box;
    margin-left: -20px;
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

    const fetchQrImage = async (text) => {
        try {
            const fetched = await request(`/dev/qr/getcode/`, 'POST', { text });
            setQrImage(fetched.link);
        } catch (e) {
        }
    }


    return (
        <QrContainer>
            <QrContent>
                <QrInput onChange={(e) => fetchQrImage(e.target.value)}/>
            </QrContent>
            <QrSeparator>
                <QrLoader>
                    {loading ? <Loader/> : 'ok'}
                </QrLoader>
            </QrSeparator>
            <QrResult>
                <img src={qrImage} alt=""/>
            </QrResult>
        </QrContainer>
    );
}