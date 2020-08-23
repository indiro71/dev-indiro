import React from 'react';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function NavTop() {
    return (
        <div className="navbar-fixed">
            <nav className="navbar white">
                <div className="nav-wrapper">
                    <Link className="brand-logo grey-text text-darken-4" to={'/'}>Develop</Link>
                    <ul id="nav-mobile" className="right">
                        <li className="hide-on-med-and-down"><a href="http://dev.indiro.ru/">Develop</a></li>
                        <li className="hide-on-med-and-down"><a href="http://games.indiro.ru/">Games</a></li>
                        <li className="hide-on-med-and-down"><a href="http://apps.indiro.ru/">Apps</a></li>
                        <li className="hide-on-med-and-down"><a href="http://scanprice.indiro.ru/">Scanprice</a></li>
                    </ul>
                    <a href="#!" data-target="sidenav-left" className="sidenav-trigger left"><i
                        className="material-icons black-text"><Menu/></i></a>
                </div>
            </nav>
        </div>
    );
}

export default NavTop;
