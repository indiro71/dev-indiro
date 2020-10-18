import React, { useCallback, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useForm } from 'react-hook-form';
import { LinearProgress, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const SettingsPage = () => {
    const { loading, request } = useHttp();
    const { register, handleSubmit } = useForm();
    const [ settings, setSettings ] = useState([]);
    const [ status, setStatus ] = useState('');
    const [ open, setOpen ] = useState(false);

    const fetchSettings = useCallback(async () => {
        try {
            try {
                const fetched = await request(`/dev/settings/all`, 'GET');
                setSettings(fetched.settings);
            } catch (e) {
            }
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, []);

    const addSetting = async (data) => {
        if (data.name && data.value) {
            try {
                try {
                    const fetched = await request(`/dev/settings/add/`, 'POST', data);
                    setStatus(fetched.message);
                    fetchSettings();
                    setOpen(true);
                } catch (e) {
                    setStatus(e.message);
                }
            } catch (e) {
            }
        }
    };

    const deleteSetting = async (deleteSettingId) => {
        const fetched = await request(`/dev/settings/delete/${deleteSettingId}`, 'DELETE');
        fetchSettings();
        setOpen(true);
        setStatus(fetched.message);
    }

    return (
        <div className="row">
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>
            <Snackbar
                open={open}
                message={status}
            />
            <div className="col s12">
                <h2>Settings</h2>
            </div>

            {settings.map(setting => {
                return (
                    <div key={setting._id} className="col s12 m6">
                        <div className="card darken-1">
                            <div className="card-content black-text">
                                <span className="card-title">{setting.name}</span>
                                <p>{setting.value}</p>
                            </div>
                            <div className="card-action">
                                <Link to={`/settings/${setting._id}`}>Edit setting</Link>
                                <a onClick={() => deleteSetting(setting._id)} href="#">Delete</a>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="col s12">
                <h2>Add setting</h2>
                <form className={'addsetting'} onSubmit={handleSubmit(addSetting)} noValidate autoComplete="off">
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="name">Setting name</label>
                            <input name="name" id="name" ref={register} type="text" className="validate"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="value">Setting value</label>
                            <input name="value" id="value" ref={register} type="text" className="validate"/>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Add
                        <i className="material-icons right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}