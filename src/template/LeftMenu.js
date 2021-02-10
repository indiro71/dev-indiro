import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LeftMenu() {
    const [ filterMenu, setFilterMenu ] = useState([]);
    const auth = useContext(AuthContext);
    const menu = [
        {
            title: 'Main',
            link: '/'
        },
        {
            title: 'Qr-code generator',
            link: '/qr'
        },
        {
            title: 'Short links',
            link: '/links'
        },
        {
            title: 'Add link',
            link: '/links/add',
            auth: true
        },
        {
            title: 'Notes',
            link: '/notes'
        },
        {
            title: 'Add note',
            link: '/notes/add',
            auth: true
        },
        {
            title: 'Instagram',
            link: '/instagram'
        },
        {
            title: 'Add InstaProfile',
            link: '/instagram/add',
            auth: true
        },
        {
            title: 'Slack',
            link: '/slack'
        },
        {
            title: 'Tags',
            link: '/tags',
            auth: true
        },
        {
            title: 'Auth',
            link: 'Auth',
            auth: false
        },
        {
            title: 'Logout',
            auth: true,
            onclick: () => {auth.logout();}
        }
    ];

    useEffect(() => {
        if (auth.isAuthenticated) {
            setFilterMenu(menu.filter(item => item.auth !== false));
        } else {
            setFilterMenu(menu.filter(item => item.auth !== true));
        }
    }, [ auth.isAuthenticated ]);

    return (
        <ul id="slide-out" className="sidenav sidenav-fixed">
            {filterMenu.map(item => {
                if (item.link) {
                    return (
                        <li key={item.link}>
                            <NavLink className={'bold waves-effect'} to={item.link}>{item.title}</NavLink>
                        </li>
                    );
                } else {
                    return (
                        <li key={item.link}>
                            <a onClick={item.onclick}>{item.title}</a>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default LeftMenu;
