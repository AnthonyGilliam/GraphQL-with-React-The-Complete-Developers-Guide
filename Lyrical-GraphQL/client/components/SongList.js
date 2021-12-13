import React, {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {Link} from 'react-router-dom';
import {GET_SONGS, DELETE_SONG} from '../queries/songs';

const SongList = () => {
    const {loading: getSongsLoading, error: getSongsError, data: getSongsData} = useQuery(GET_SONGS);
    const [deleteSong, {loading: deleteSongsLoading, error: deleteSongsError, data: deleteSongsData}] =
        useMutation(DELETE_SONG, {
            refetchQueries: [{query: GET_SONGS}]
        });
    useEffect(() => {
        console.log('Queried State:', getSongsLoading, getSongsError, getSongsData);
    }, [getSongsLoading, getSongsError, getSongsData]);
    if (getSongsLoading) return <p>getSongsLoading...</p>;
    if (getSongsError) return <p>getSongsError: {getSongsError.message}</p>;
    return (
        <div className="container">
            <ul className="collection">
                {getSongsData.songs.map(({id, title}, index) => (
                    <li key={index} className="collection-item">
                        {title}
                        <i
                            className="material-icons"
                            onClick={() => {
                                deleteSong({variables: {id}})
                            }}
                        >
                            delete
                        </i>
                    </li>
                ))}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
            </Link>
        </div>
    );
}

export default SongList;
