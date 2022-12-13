const { GraphQLList, GraphQLString, GraphQLID } = require('graphql');
const { UserType, PostType, CommentType } = require("./types")
const { User, Post, Comment } = require("../models")

// vendria siendo similar al controller
//TODO query que retorna la lista de todos los usuarios
const users = {
    type: new GraphQLList(UserType),   //tipado para que retorne una lista
    description: "devuelve la lista de usuarios",
    resolve() {
        return User.find();
    },
};


//TODO query que retorna un solo usuario por id
const user = {
    type: UserType,
    description: "obtiene un user por id",
    args: {
        id: { type: GraphQLID }
    },
    resolve(_, args) {
        return User.findById(args.id)
    }
};


//TODO obtenindo la lista de los post
const posts = {
    type: new GraphQLList(PostType),
    description: "obtenindo la lista de todos los posts",
    resolve: () => Post.find()
};


//TODO obteniendo un post por id
const post = {
    type: PostType,
    description: "consultando un post por id",
    args : {
        id: { type: GraphQLID}
    },
    resolve: (_, { id }) => Post.findById(id)

};


//TODO listando todos los comentarios
const  comments = {
    type: new GraphQLList(CommentType),
    description: "lista de todos los comentarios",
    resolve: () => Comment.find()
}


//TODO obtenindo un solo comentario por id 
const comment = {
    type: CommentType,
    description: "obtine un solo comentario por id",
    args: {
        id: { type:  GraphQLID} 
    },
    resolve: (_, {id}, ) => Comment.findById(id)
}
module.exports = { users, user, posts, post, comments, comment };