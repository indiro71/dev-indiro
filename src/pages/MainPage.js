import React from 'react';
import { Link } from 'react-router-dom';
import qrDefault from '../media/qrDefault.png';
import shortLink from '../media/shortLink.png';

export const MainPage = () => {
    return (
        <div className="masonry row">
            <div className="col s12">
                <h2>Develops</h2>
            </div>

            <div className="col xl l4 m6 s12">
                <div className="card">
                    <Link to={'/qr'}>
                        <div className="card-image waves-effect waves-block waves-light">
                            <img alt={'QR-code generator'} className="activator" src={qrDefault}/>
                        </div>
                        <div className="card-content">
                            <span className="card-title center-align activator grey-text text-darken-4">QR-code generator</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="col xl l4 m6 s12">
                <div className="card">
                    <Link to={'/links'}>
                        <div className="card-image waves-effect waves-block waves-light">
                            <img alt={'Short links'} className="activator" src={shortLink}/>
                        </div>
                        <div className="card-content">
                            <span
                                className="card-title center-align activator grey-text text-darken-4">Short links</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}