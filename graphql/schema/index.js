
const { buildSchema } = require('graphql')

module.exports = buildSchema(`

        type Event {
            id:ID!
            title:String!
            description:String
            price:Float!
            
        }

        input EventInput {
            title:String!
            description:String
            price:Float!
           
        }

        type User {
            id:ID
            name:String!
            email:String!
            password:String!
        }

        input UserInput {
            name:String!
            email:String!
            password:String!
        }

        type AuthData {
            userId:ID!
            token:String!
            tokenExpiration:Int!
        }

        type RootQuery {
            events: [Event!]!
            users:[User!]!
            login(email:String!, password:String!):AuthData!
        }

        type RootMutation {
            createEvent(eventInput : EventInput): Event
            createUser(userInput : UserInput): User
        }

        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `)