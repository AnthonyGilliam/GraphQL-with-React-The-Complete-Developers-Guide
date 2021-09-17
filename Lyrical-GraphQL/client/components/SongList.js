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
        <div className="container">
            <ul className="collection">
                {data.songs.map((song, index) => (
                    <li key={index} className="collection-item">
                        {song.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SongList;
