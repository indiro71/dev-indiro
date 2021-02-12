import React, { useCallback, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { SelectTag } from '../../components/SelectTag';

export const InstagramAddPost = ({ profileId, onAddPost }) => {
    const { request } = useHttp();
    const { register: instaPostForm, handleSubmit } = useForm();
    const [allTags, setAllTags] = useState([]);
    const [datePublish, setDatePublish] = useState('');
    const [tags, setTags] = useState([]);

    const onAddTag = async (tags) => {
        setTags(tags);
    };

    const addPost = useCallback(async (data) => {
        if (data.title && data.imageUrl) {
            data.tags = tags;
            data.datePublish = moment(datePublish).format('L');

            try {
                await request(`/dev/instagram/post/`, 'POST', data);
                onAddPost();
            } catch (e) {

            }
        }
    }, [request, tags, datePublish]);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = useCallback(async () => {
        try {
            const fetched = await request(`/dev/tags/list/`, 'GET');
            const tags = fetched.tags.map(tag => tag.name);
            setAllTags(tags);
        } catch (e) {
        }
    }, [request]);

    const addTagInDB = useCallback(async (name) => {
        try {
            await request(`/dev/tags/add/`, 'POST', { name });
            await fetchTags();
        } catch (e) {
        }
    }, [request]);

    return (
        <form className={'addpost'} noValidate autoComplete="off">
            <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="title">Title</label>
                    <input name="title" id="title" ref={instaPostForm} type="text" className="validate"/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="imageUrl">Image url</label>
                    <input name="imageUrl" id="imageUrl" ref={instaPostForm} type="text" className="validate"/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" ref={instaPostForm} className="validate"/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <p>Date publish</p>
                    <DatePicker dateFormat="dd.mm.yyyy" selected={datePublish} onChange={date => setDatePublish(date)}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <SelectTag tags={allTags} onAddNewTag={addTagInDB} onSelectTag={onAddTag}/>
                </div>
            </div>
            <input name="profileId" id="profileId" ref={instaPostForm} type="hidden" value={profileId}
                   className="validate"/>
            <button className="btn waves-effect waves-light" type="button" onClick={handleSubmit(addPost)}
                    name="action">Save post
                <i className="material-icons right"></i>
            </button>
        </form>
    );
};