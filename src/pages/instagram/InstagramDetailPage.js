import React, { useCallback, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InstagramAddPost } from './InstagramAddPost';
import { InstagramPosts } from './InstagramPosts';

export const InstagramDetailPage = () => {
    const { loading, request } = useHttp();
    const [account, setAccount] = useState();
    const [edit, setEdit] = useState(false);
    const [addPost, setAddPost] = useState(false);

    const { register: instaForm, handleSubmit, setValue } = useForm();
    const accountName = useParams().name;
    const history = useHistory();

    const fetchAccount = useCallback(async () => {
        try {
            const fetched = await request(`/dev/instagram/account/${accountName}`, 'GET');
            setAccount(fetched.account);
        } catch (e) {
            history.push('/instagram');
        }
    }, [request, accountName]);

    const editAccount = useCallback(async (data) => {
        try {
            await request(`/dev/instagram/edit/${account._id}`, 'PUT', data);
            await fetchAccount();
            setEdit(false);
        } catch (e) {
            history.push('/instagram');
        }
    }, [request, account]);

    const deleteAccount = useCallback(async () => {
        try {
            await request(`/dev/instagram/delete/${account._id}`, 'DELETE');
            history.push('/instagram');
        } catch (e) {
            history.push('/instagram');
        }
    }, [request, account]);

    const toggleEdit = () => {
        setEdit(true);
        setTimeout(() => {
            setValue('countLikes', account.countLikes);
            setValue('active', account.active);
            setValue('tested', account.tested);
            setValue('private', account.private);
            setValue('tagLikes', account.tagLikes.join(', '));
        });
    };

    useEffect(() => {
        fetchAccount();
    }, [fetchAccount]);

    if (loading && !account) {
        return <LinearProgress style={{ opacity: 1 }}/>;
    }

    const updatePost = () => {
        setAddPost(false);
        fetchAccount();
    };

    return (
        <>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

            {account &&
            <div className="col s12">
                <div className="card darken-1">
                    <div className="card-content black-text">
                        <h2>{account.name}</h2>
                        <p><b>Likes count:</b> {account.countLikes}</p>
                        {account.canEdit && <div>
                            <p><b>Active</b> - {account.active ? 'yes' : 'no'}</p>
                            <p><b>Tested</b> - {account.tested ? 'yes' : 'no'}</p>
                            <p><b>Private</b> - {account.private ? 'yes' : 'no'}</p>
                            <p><b>Tags for likes:</b> {account.tagLikes.join(', ')}</p>
                            <br/>
                            {!edit &&
                            <button onClick={toggleEdit} className="btn waves-effect waves-light" type="button"
                                    name="edit">Edit profile
                                <i className="material-icons right"></i>
                            </button>}

                            {edit && <div>
                                <form className={'editaccount'} onSubmit={handleSubmit(editAccount)} noValidate
                                      autoComplete="off">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="password">Password</label>
                                            <input name="password" id="password" ref={instaForm} type="password"
                                                   className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="countLikes">Likes count</label>
                                            <input name="countLikes" id="countLikes" ref={instaForm} type="text"
                                                   className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <label htmlFor="tagLikes">Tags for like</label>
                                            <input name="tagLikes" id="tagLikes" ref={instaForm} type="text"
                                                   className="validate"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <div className="switch">
                                                <label htmlFor="active">Active</label><br/>
                                                <label>
                                                    Off
                                                    <input name="active" id="active" ref={instaForm} type="checkbox"/>
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
                                                    <input name="tested" id="tested" ref={instaForm} type="checkbox"/>
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
                                                    <input name="private" id="private" ref={instaForm} type="checkbox"/>
                                                    <span className="lever"></span>On
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Edit
                                        <i className="material-icons right"></i>
                                    </button>
                                </form>
                                <br/>
                                <button onClick={deleteAccount} className="btn waves-effect waves-light" type="button"
                                        name="delete">Delete
                                    <i className="material-icons right"></i>
                                </button>
                            </div>
                            }

                            <h3>Posts to publish</h3>

                            {account.posts.length > 0 && <div>
                                <InstagramPosts posts={account.posts} onDeletePost={updatePost}/>
                            </div>}

                            {!addPost &&
                            <button onClick={() => setAddPost(true)} className="btn waves-effect waves-light"
                                    type="submit" name="action">Add new post
                                <i className="material-icons right"></i>
                            </button>}

                            {addPost && <div>
                                <InstagramAddPost onAddPost={updatePost} profileId={account._id}/>
                            </div>}

                        </div>
                        }
                    </div>
                </div>
            </div>
            }
        </>
    );
};