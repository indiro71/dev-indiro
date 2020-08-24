import React from 'react';
import { Link } from 'react-router-dom';
import { CropFree, Link as ShortLink, DeveloperMode } from '@material-ui/icons';

function LeftMenu() {
    return (
        <ul id="sidenav-left" className="sidenav sidenav-fixed">
            <li><a href="/" className="logo-container">Admin<i
                className="material-icons left"><DeveloperMode/></i></a></li>
            <li className="no-padding">
                <ul className="collapsible collapsible-accordion">
                    <li className="bold waves-effect">
                        <Link className={'collapsible-header'} to={'/qr'}>QR-code generator<i
                            className={'chevron'}><CropFree/></i></Link>
                    </li>
                    <li className="bold waves-effect">
                        <Link className={'collapsible-header'} to={'/links'}>Short links<i
                            className={'chevron'}><ShortLink/></i></Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default LeftMenu;
