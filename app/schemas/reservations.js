const GraphQLSchema = require('graphql').GraphQLSchema;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolver = require('../resolvers/reservations').resolver;

const typeDefs = `
    type Reservation {
        id: String!
        hotel_id: String
        phone_number: String
        name: String
        room_number: Int
        checked_in: Boolean
    }

    type Query {
        reservations: [Reservation]!
    }
`;

module.exports =  {
    schema: makeExecutableSchema({
        typeDefs, 
        resolver
    })
};