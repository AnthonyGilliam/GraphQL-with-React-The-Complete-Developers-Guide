const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const models = require('./models');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/lyricaldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(error => console.error('Mongo Connection Error', error));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
