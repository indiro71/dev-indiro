import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { LinearProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

export const LinkList = () => {
    const { loading, request } = useHttp();
    const [links, setLinks] = useState([]);
    const auth = useContext(AuthContext);

    const fetchLinks = async () => {
        try {
            const fetched = await request(`/dev/links/list/`, 'GET');
            setLinks(fetched.links);
        } catch (e) {

        }
    };

    const deleteLink = async deleteLinkId => {
        const deleted = await request(`/dev/links/delete/${deleteLinkId}`, 'DELETE');
        fetchLinks();
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    if (auth.token) {
        return (
            <div className="masonry row">

                <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

                {!loading && links.length > 0 && links.map(link => {
                    return (
                        <div className="col">
                            <div className="card">
                                <div className="card-content">
                                    <p className="card-title activator grey-text text-darken-4">{link.url}</p>
                                    <p className=""><b>Short
                                        link</b>: {window.location.hostname === 'localhost' ? 'http://localhost:7171/dev/links/redirect/' : 'http://l.indiro.ru/'}{link.shortLink}
                                    </p>
                                    <p className=""><b>Views:</b> {link.views}</p>
                                    <button onClick={() => deleteLink(link._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {!loading && links.length === 0 &&
                    <div>No links</div>
                }
            </div>
        );
    } else {
        return (
            <div>Need authorize</div>
        );
    }

};