import React, {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';

const GET_SONGS = gql`
    query GetSongs {
        songs {
            title
        }
    }
`;

const SongList = () => {
    const {loading, error, data} = useQuery(GET_SONGS);
    useEffect(() => {
        console.log("Queried State:", loading, error, data);
    }, [loading, error, data]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        data.songs.map((song, index) => (
            <div key={index}>
                {song.title}
            </div>
        ))
    );
}

export default SongList;
