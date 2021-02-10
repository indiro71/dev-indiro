import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

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

const noop = () => {
};

export const SelectTag = ({ tags, onSelectTag = noop, onAddNewTag = noop }) => {
    const [allTags, setAllTags] = useState([]);
    const [sortTags, setSortTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTag, setSearchTag] = useState('');

    useEffect(() => {
        const sort = tags.sort();
        setAllTags(sort);
        setSortTags(sort);
    }, [tags]);

    useEffect(() => {
        onSelectTag(selectedTags);
    }, [selectedTags]);

    const sorting = (e) => {
        setSearchTag(e.target.value);
        const sort = allTags.filter(tag => tag.indexOf(e.target.value) !== -1);
        if (e.target.value !== '') {
            setSortTags(sort);
        } else {
            setSortTags(allTags);
        }
    };

    const addByPress = (event) => {
        if (event.key === 'Enter') {
            if (!allTags.includes(searchTag)) {
                onAddNewTag(searchTag);
            }
            addTag(searchTag);
        }
    };

    const addTag = (name) => {
        if (selectedTags.indexOf(name) === -1) {
            setSelectedTags([...selectedTags, name]);
        }
        setSortTags(allTags);
        setSearchTag('');
    };

    const removeSelected = (name) => {
        const sort = selectedTags.filter(tag => tag !== name);
        setSelectedTags(sort);
    };

    return (
        <div>
            {selectedTags.length > 0 && <>
                <h4>Selected tags</h4>
                <Tags>
                    {selectedTags.map(tag => {
                        return (
                            <Tag
                                key={tag}
                                onClick={() => removeSelected(tag)}
                            >
                                {tag}
                            </Tag>
                        );
                    })
                    }
                </Tags>
            </>}


            <h4>Find tag</h4>
            <div>
                <input placeholder="Search tag" value={searchTag} onKeyDown={addByPress} onChange={sorting}
                       type="text"/>
            </div>
            <Tags>
                {sortTags.length > 0 && sortTags.map(tag => {
                    return (
                        <Tag
                            key={tag}
                            onClick={() => addTag(tag)}
                        >
                            {tag}
                        </Tag>
                    );
                })
                }
                {allTags.length > 0 && sortTags.length === 0 && tags.map(tag => {
                    return (
                        <Tag
                            key={tag}
                            onClick={() => addTag(tag)}
                        >
                            {tag}
                        </Tag>
                    );
                })
                }
            </Tags>
        </div>
    );
};