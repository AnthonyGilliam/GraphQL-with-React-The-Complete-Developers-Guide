import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import './style/style.css';

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter basename="/" hashType="slash">
                <Route exact path="/" component={SongList}/>
                <Route exact path="/songs/new" component={SongCreate}/>
                <Route exact path="/songs/:id" component={SongDetail}/>
            </HashRouter>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
