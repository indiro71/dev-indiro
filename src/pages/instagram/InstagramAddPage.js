import React, { useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useForm } from 'react-hook-form';
import { LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const InstagramAddPage = () => {
    const { loading, request } = useHttp();
    const { register: instaForm, handleSubmit } = useForm();
    const history = useHistory();

    const addAccount = useCallback(async (data) => {
        if (data.name && data.password) {
            try {
                await request(`/dev/instagram/add/`, 'POST', data);
                history.push(`/instagram/${data.name}`);
            } catch (e) {
                history.push('/instagram');
            }
        }
    }, [request]);

    return (
        <div className="row">
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

            <div className="col s12">
                <h2>Add account</h2>
                <form className={'addaccount'} onSubmit={handleSubmit(addAccount)} noValidate autoComplete="off">
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" ref={instaForm} type="text" className="validate"/>
                        </div>
                    </div>
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
                    <button className="btn waves-effect waves-light" type="submit" name="action">Add
                        <i className="material-icons right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};