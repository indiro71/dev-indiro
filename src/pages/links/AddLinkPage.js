import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Snackbar, LinearProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';

export const AddLinkPage = () => {
    const { loading, request } = useHttp();
    const { register, handleSubmit, errors } = useForm();
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const addLink = async (data) => {
        if (data.url) {
            try {
                const fetched = await request(`/dev/links/add/`, 'POST', data);
                history.push('/links');
            } catch (e) {
                setStatus(e.message);
            }
            setOpen(true);
        }
    };

    return (
        <>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>
            <Snackbar
                open={open}
                message={status}
            />

            <div className="masonry row">
                <div className="col s12">
                    <h2>Add link</h2>
                    <form className={'addlink'} onSubmit={handleSubmit(addLink)} noValidate autoComplete="off">
                        <div className="row">
                            <div className="input-field col s6">
                                <label htmlFor="url">Link</label>
                                <input name="url" id="url" ref={register} type="text" className="validate"/>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Add
                            <i className="material-icons right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};