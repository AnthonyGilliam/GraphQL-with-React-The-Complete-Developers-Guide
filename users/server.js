const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema
}));

app.listen(port = 4000, () => {
   console.log(`Listening on port:  ${port}`);
});
