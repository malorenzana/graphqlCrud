const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require('./graphql/schema')
const { connectDB } = require('./db/index')
const { authenticate } =  require("./middlewares/auth")

connectDB()
const app = express();

//inyectando autenticacion
app.use(authenticate)

//ruta inicial 
app.get('/', (req, res) => {
    res.send("welcome to my graphql")
})


//ruta, usando Graphql, interfas para test
app.use('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true
}))

app.listen(3000)
console.log("server is running on port 3000")


