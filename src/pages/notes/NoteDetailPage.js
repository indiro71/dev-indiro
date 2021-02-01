import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

const Button = styled.div`
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    background: red;
    color: white;
`;

export const NoteDetailPage = () => {
    const { loading, request } = useHttp();
    const [content, setContent] = useState('<p>Edit content</p>');
    const noteId = useParams().id;
    const [name, setName] = useState('New note');
    const [edited, setEdited] = useState(!!!noteId);
    const history = useHistory();

    const toggleEdit = async () => {
        setEdited(!edited);

        if (edited) {
            try {
                if (noteId) {
                    await request(`/dev/notes/edit/${noteId}`, 'PUT', {name, content});
                } else {
                    await request(`/dev/notes/add`, 'POST', {name, content});
                }
            } catch (e) {
                history.push('/notes');
            }
        }
    }

    const fetchNote = async () => {
        try {
            const { note: {content, name} } = await request(`/dev/notes/item/${noteId}`, 'GET');
            setContent(content);
            setName(name);
        } catch (e) {
            history.push('/notes');
        }
    };

    const handleEditorChange = (content, editor) => {
        setContent(content);
    }

    useEffect(() => {
        if (noteId) fetchNote();
    }, []);

    if (loading) {
        return <LinearProgress style={{ opacity: 1 }}/>
    }

    return (
        <>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

            <div className="col s12">
                <div className="card">
                    <div className="container">

                        {edited ? <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> : <h2>{name}</h2>}

                        <Editor
                            value={content}
                            apiKey={'bc5wxybrlb9ieapsti1dv3wsd1c1rmh6i2qqajbjgndwla1h'}
                            disabled={!edited}
                            inline={true}
                            outputFormat='html'
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 500,
                                menubar: 'file edit view insert format tools table help',
                                plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                                toolbar: [
                                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify',
                                    'outdent indent |  numlist bullist | forecolor backcolor removeformatinsertfile image media template link  codesample'
                                ]

                            }}
                        />

                        <Button onClick={() => toggleEdit()}>{edited ? 'Save' : 'Edit'}</Button>
                    </div>
                </div>
            </div>
        </>
    );
};