const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;
const axios = require('axios');

// import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'An application user',
    fields: {
        id: { type: GraphQLString },
        firstName:  { type: GraphQLString },
        age:  { type: GraphQLInt }
    }
});

// const CompanyType = new GraphQLObjectType({
//
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'The root object of the application',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
