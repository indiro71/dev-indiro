import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';

export const InstagramMainPage = () => {
    const { loading, request } = useHttp();
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = useCallback(async () => {
        try {
            const fetched = await request(`/dev/instagram/list/`, 'GET');
            setAccounts(fetched.accounts);
        } catch (e) {
        }
    }, [request]);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return (
        <div className="masonry row">
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

            {!loading && accounts.length > 0 && accounts.map(account => {
                return (
                    <div key={account._id} className="col s12 m6">
                        <Link to={`/instagram/${account.name}`}>
                            <div className="card darken-1">
                                <div className="card-content black-text">
                                    <span className="card-title">{account.name}</span>
                                </div>
                                <div className="card-action">
                                    <Link to={`/instagram/${account.name}`}>View profile</Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}

            {!loading && accounts.length === 0 &&
            <div>No accounts</div>
            }
        </div>
    );
};