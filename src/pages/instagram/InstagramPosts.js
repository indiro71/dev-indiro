import React, { useCallback } from 'react';
import moment from 'moment';
import { useHttp } from '../../hooks/http.hook';

export const InstagramPosts = ({ posts, onDeletePost }) => {
    const { request } = useHttp();

    const deletePost = useCallback(async (postId) => {
        try {
            await request(`/dev/instagram/post/${postId}`, 'DELETE');
            onDeletePost();
        } catch (e) {
        }
    }, [request]);

    return (
        <div className="row">
            {posts.map(post => {
                return (
                    <div key={post._id} className="col s12 m4">
                        <div className="card">
                            <div className="card-image">
                                <img src={post.imageUrl}/>
                                <span className="card-title">{post.title}</span>
                            </div>
                            <div className="card-content">
                                <p><b>Description: </b>{post.description}</p>
                                <p><b>Date publish: </b><b>{moment(post.datePublish).format('Do MMMM YYYY')}</b></p>
                                <p><b>Tags: </b>{post.tags.join(', ')}</p>
                                <p>{post.published ? 'Publish' : 'Unpublish'}</p>
                            </div>
                            <div className="card-action">
                                <button className="btn waves-effect waves-light" onClick={() => {
                                    deletePost(post._id);
                                }}>Delete post
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};