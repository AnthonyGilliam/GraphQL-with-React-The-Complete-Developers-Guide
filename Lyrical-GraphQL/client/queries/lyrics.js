import {gql} from '@apollo/client';

export const ADD_LYRIC = gql`
    mutation AddLyric($songId: ID!, $content: String!) {
        addLyricToSong(content: $content, songId: $songId) {
            lyrics {
                id
            }
        }
    }
`;
