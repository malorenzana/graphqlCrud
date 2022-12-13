const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { User, Post, Comment } = require("../models")

// se le pasa al queri como tipo de dato  (retorna estos campos) (Schema Graphql)
const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "tipo de dato del usuario",
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },

    },
});


// schema para usar en la creacion de una nueva publicacion (Schema Graphql)
const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "tipo de post",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        author: {
            type: UserType,
            resolve(parent) {    //funcion para consultar el autor y retornarlo a la hora de crear una nueva publicacion  
                return User.findById(parent.authorId) //inyectandole el author de la publicacion
            }
        },
        comments: {   //una publicacion puede tener una lista de commentarios
            type: new GraphQLList(CommentType),
            resolve (parent) {
                return Comment.find({postId: parent.id}) //consultando todos los comentarios
            }
        }
    }),
});


// tipo de objeto para usar en la creacion de un Commentario (Schema Graphql)
const CommentType = new GraphQLObjectType({
    name: "CommentType",
    description: "comentar las publicaciones",
    fields: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType, resolve(parent) { //inyectandole el usuario al comentario
                return User.findById(parent.userId)
            }
        },
        post: {
            type: PostType, resolve(parent) { //inyectandole la publicacion al comentario
                return Post.findById(parent.postId) 
            }
        }
    }

});

module.exports = { UserType, PostType, CommentType }