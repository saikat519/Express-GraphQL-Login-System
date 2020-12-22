const express = require('express')
const  { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')

const Sequelize = require('sequelize')

const db = require('./config/database');
const User = require('./models/user');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middlewares/is-auth')
const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.use(isAuth)

app.get('/', (req, res) =>{
    res.status(200).send("hello")
})




app.use('/graphql',graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql:true

})
);






try {
    db.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(8000)
  } 
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

