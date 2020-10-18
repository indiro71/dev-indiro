import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { LinearProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';

export const DetailSettingPage = () => {
    const { loading, request } = useHttp();
    const [ setting, setSetting ] = useState([]);
    const { register, handleSubmit, setValue } = useForm();
    const settingId = useParams().id;
    const history = useHistory();

    const fetchSetting = useCallback(async () => {
        try {
            try {
                const fetched = await request(`/dev/settings/item/${settingId}`, 'GET');
                setSetting(fetched.setting);
                setValue('name', fetched.setting.name);
                setValue('value', fetched.setting.value);
            } catch (e) {
            }
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        fetchSetting();
    }, []);

    const editSetting = async (data) => {
        if (data.name && data.value) {
            try {
                try {
                    await request(`/dev/settings/item/${setting._id}`, 'PUT', data);
                    history.push('/settings');
                } catch (e) {
                }
            } catch (e) {
            }
        }
    };

    return (
        <div className="masonry row">
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>
            {setting.name ?
                <div className="row">
                    <div className="col xl12">
                        <h2>Edit setting</h2>
                        <form className={'addsetting'} onSubmit={handleSubmit(editSetting)} noValidate
                              autoComplete="off">
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
                            <button className="btn waves-effect waves-light" type="submit" name="action">Edit
                                <i className="material-icons right"></i>
                            </button>
                        </form>
                    </div>
                </div>
                : null}
        </div>
    );
}