import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_SONG} from '../queries/songs';
import LyricCreate from './LyricCreate';

const SongDetail = () => {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_SONG, {variables: {id}});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log('GET_SONG results:  ', data)
    const {song} = data;
    return (
        <div>
            <Link to="/">Back</Link>
            <h3>{song.title}</h3>
            <LyricCreate />
        </div>
    );
}

export default SongDetail;
