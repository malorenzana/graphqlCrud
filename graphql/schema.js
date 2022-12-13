const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, posts, post, comments, comment } = require('./queries')
const { register, login, createPost, updatePost, deletePost, addComment, updateCommet, deleteComment } = require('./mutation')


//TODO Query raiz, agregando todos los querys creados
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: 'The root query type',
    fields: {
       users,
       user,
       posts,
       post,
       comments,
       comment
    },
});


//TODO mutacion raiz, agregando todas las mutaciones creadas
const mutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: "the root mutation type",
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        addComment,
        updateCommet,
        deleteComment
    },
});


//definiendo consultas
module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: mutationType
});

