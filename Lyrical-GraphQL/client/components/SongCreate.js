import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client';
import {ADD_SONG, GET_SONGS} from '../queries/songs'

const SongCreate = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [addSong, {data, loading, error}] = useMutation(ADD_SONG, {
        refetchQueries: [{query: GET_SONGS}]
    });
    if (loading) return <div>Submitting Query</div>;
    if (error) return <div>Error: {error.message}</div>;
    const onSubmit = (evt) => {
        evt.preventDefault();
        addSong({variables: {title}})
            .then(data => {
                console.log('Mutation Data: ', data);
                history.push('/');
            })
            .catch((err) => console.error(err));

    }
    return (
        <div>
            <Link to="/">Back</Link>
            <h3>Create a New Song</h3>
            <form onSubmit={onSubmit}>
                <label>Song Title:</label>
                <input onChange={event => setTitle(event.target.value)} value={title}/>
            </form>
        </div>
    );
}

export default SongCreate;
