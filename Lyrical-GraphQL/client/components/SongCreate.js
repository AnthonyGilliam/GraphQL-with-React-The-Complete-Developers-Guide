import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';

const ADD_SONG = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

const SongCreate = () => {
    const [title, setTitle] = useState('');
    const [addSong, { data, loading, error }] = useMutation(ADD_SONG);
    if (loading) return <div>Submitting Query</div>;
    if (error) return <div>Error: {error.message}</div>;
    const onSubmit = (evt) => {
        evt.preventDefault();
        addSong({variables: { title }})
            .then(data => { console.log("Mutation Data: ", data) });
    }
    return (
        <div>
            <h3>Create a New Song</h3>
            <form onSubmit={onSubmit}>
                <label>Song Title:</label>
                <input onChange={event => setTitle(event.target.value)} value={title}/>
            </form>
        </div>
    );
}

export default SongCreate;
