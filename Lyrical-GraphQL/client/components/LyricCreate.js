import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client';
import {ADD_LYRIC} from '../queries/lyrics';

const LyricCreate = () => {
    return (
        <form>
            <label>Add a Lyric</label>
            <input/>
        </form>
    );
}

export default LyricCreate;
