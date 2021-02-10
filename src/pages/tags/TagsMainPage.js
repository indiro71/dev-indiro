import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import { SelectTag } from '../../components/SelectTag';

const Tags = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const Tag = styled.div`
    display: block;
    padding: 5px 16px;
    text-align: center;
    background: rgba(52, 240, 0, .4);
    color: #3E7D00
    border-color: 2px solid #3E7D00;
    color: #3E7D00;
    font-size: 17px;
    cursor: pointer;
    border-radius: 15px;
    margin: 5px;
    transition: all 0.2s ease-out;
    
    &:hover {
        color: #FA1D00;
        background: rgba(250, 29, 0, .4);
        border-color: 2px solid #FA1D00;
    }
`;

export const TagsMainPage = () => {
    const { loading, request } = useHttp();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = useCallback(async () => {
        try {
            const fetched = await request(`/dev/tags/list/`, 'GET');
            const tags = fetched.tags.map(tag => tag.name);
            setTags(tags);
        } catch (e) {
        }
    }, [request]);

    const addTag = (event) => {
        if (event.key === 'Enter') {
            if (tags.indexOf(event.target.value) === -1) {
                addTagInDB(tag);
                setTag('');
            }
        }
    };

    const addTagInDB = useCallback(async (name) => {
        try {
            await request(`/dev/tags/add/`, 'POST', { name });
            await fetchTags();
        } catch (e) {
        }
    }, [request]);

    const deleteTag = useCallback(async (name) => {
        try {
            await request(`/dev/tags/delete`, 'DELETE', { name });
            await fetchTags();
        } catch (e) {
        }
    }, [request]);

    const onAddTag = async (name) => {
        addTagInDB(name);
    };

    return (
        <div className="masonry row">
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>
            <div className="col-12">
                <div className="card">
                    <div className="card-content">
                        <h4>Add tag</h4>
                        <div className="input-field">
                            <label htmlFor="name">Tag name</label>
                            <input name="name" id="name" value={tag} type="text"
                                   onChange={(e) => setTag(e.target.value)} onKeyDown={addTag}/>
                        </div>
                        <h5>Delete tags</h5>
                        <Tags>
                            {tags.length > 0 && tags.map(tag => {
                                return (
                                    <Tag
                                        key={tag}
                                        onClick={() => deleteTag(tag)}>
                                        {tag}
                                    </Tag>
                                );
                            })}
                        </Tags>

                        {tags.length > 0 && <>
                            <h4>Example use Tag Select</h4>
                            <h5>Select tags</h5>
                            <SelectTag tags={tags} onAddNewTag={onAddTag}/>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
};