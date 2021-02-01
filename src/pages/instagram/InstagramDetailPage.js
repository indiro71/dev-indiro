import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const InstagramDetailPage = () => {
    const { loading, request } = useHttp();
    const [account, setAccount] = useState();
    const [edit, setEdit] = useState(false);
    const { register: instaForm, handleSubmit, setValue } = useForm();
    const accountName = useParams().name;
    const history = useHistory();

    const fetchAccount = async () => {
        try {
            const fetched  = await request(`/dev/instagram/account/${accountName}`, 'GET');
            setAccount(fetched.account);
        } catch (e) {
            history.push('/instagram');
        }
    };

    const toggleEdit = () => {
        setEdit(true);
        setTimeout(() => {
            setValue('countLikes', account.countLikes);
            setValue('active', account.active);
            setValue('tested', account.tested);
            setValue('private', account.private);
            setValue('tagLikes', account.tagLikes.join(', '));
        });
    }

    const editAccount = async (data) => {
        try {
            try {
                const fetched = await request(`/dev/instagram/edit/${account._id}`, 'PUT', data);
                fetchAccount();
                setEdit(false);
            } catch (e) {
                history.push('/instagram');
            }
        } catch (e) {
            history.push('/instagram');
        }
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    if (loading) {
        return <LinearProgress style={{ opacity: 1 }}/>
    }

    return (
        <>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

            {!loading && account &&
            <div className="col s12">
                <div className="card darken-1">
                    <div className="card-content black-text">
                        <h2>{account.name}</h2>
                        {account.canEdit && <div>
                            <p><b>Likes count:</b> {account.countLikes}</p>
                            <p><b>Tags for likes:</b> {account.tagLikes.join(', ')}</p>
                            <br/>
                            {!edit && <button onClick={toggleEdit}>Edit</button>}

                            {edit && <div>
                                <form className={'editaccount'} onSubmit={handleSubmit(editAccount)} noValidate autoComplete="off">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="password">Password</label>
                                            <input name="password" id="password" ref={instaForm} type="password" className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="countLikes">Likes count</label>
                                            <input name="countLikes" id="countLikes" ref={instaForm} type="text" className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="tagLikes">Tags for like</label>
                                            <input name="tagLikes" id="tagLikes" ref={instaForm} type="text" className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <div className="switch">
                                                <label htmlFor="active">Active</label><br/>
                                                <label>
                                                    Off
                                                    <input name="active" id="active" ref={instaForm}  type="checkbox" />
                                                        <span className="lever"></span>On
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <div className="switch">
                                                <label htmlFor="tested">Tested</label><br/>
                                                <label>
                                                    Off
                                                    <input name="tested" id="tested" ref={instaForm}  type="checkbox" />
                                                        <span className="lever"></span>On
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <div className="switch">
                                                <label htmlFor="private">Private</label><br/>
                                                <label>
                                                    Off
                                                    <input name="private" id="private" ref={instaForm}  type="checkbox" />
                                                        <span className="lever"></span>On
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Edit
                                        <i className="material-icons right"></i>
                                    </button>
                                </form>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
            }
        </>
    );
};