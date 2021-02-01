import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { LinearProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const NoteMainPage = () => {
    const { loading, request } = useHttp();
    const [notes, setNotes] = useState([]);
    const auth = useContext(AuthContext);

    const fetchNotes = async () => {
        try {
            const fetched = await request(`/dev/notes/list/`, 'GET');
            setNotes(fetched.notes);
        } catch (e) {

        }
    };

    const deleteNote = async deleteNoteId => {
        const deleted = await request(`/dev/notes/delete/${deleteNoteId}`, 'DELETE');
        fetchNotes();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    if (auth.token) {
        return (
            <div className="masonry row">

                <LinearProgress style={{ opacity: loading ? 1 : 0 }}/>

                {!loading && notes.length > 0 && notes.map(note => {
                    return (
                        <div className="col">
                            <div className="card">
                                <div className="card-content">
                                    <Link to={`/notes/edit/${note._id}`}>
                                        <p className="card-title activator grey-text text-darken-4">{note.name}</p>
                                    </Link>
                                    <button onClick={() => deleteNote(note._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {!loading && notes.length === 0 &&
                    <div>No notes</div>
                }
            </div>
        );
    } else {
        return (
            <div>Need authorize</div>
        );
    }

};