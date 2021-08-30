const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;
const axios = require('axios');

// import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    description: 'A company that a user works at',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(resp => resp.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'An application user',
    fields: () => ({
        id: { type: GraphQLString },
        firstName:  { type: GraphQLString },
        age:  { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    })
});

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
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
