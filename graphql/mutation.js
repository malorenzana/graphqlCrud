const { GraphQLString, GraphQLID } = require('graphql');
const { User, Post, Comment } = require('../models')
const { createJWTToken } = require('../util/auth')
const { PostType, CommentType } = require("./types")

//!LOGICA 
//TODO mutacion para registar un usuario
const register = {
    type: GraphQLString,
    description: "esto regista un nuevo user y retorna un token",
    //campos para el cliente
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString }
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;
        const user = new User({ username, email, password, displayName });
        await user.save();

        const token = createJWTToken({ _id: user._id, username: user.username, email: user.email, displayName: user.displayName })
        console.log(token);

        return token;
    },
};


//TODO mutacion para loger un usuario
const login = {
    type: GraphQLString,
    description: "esto regista un nuevo user y retorna un token",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    async resolve(_, args) {
        const user = await User.findOne({ email: args.email, }).select('+password')
        if (!user) throw new Error("Usuario no encontrado");
        if (args.password !== user.password) throw new Error("password incorrecta")

        //parametros del token
        const token = createJWTToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName
        })

        return token
    },
};


//TODO mutacion para crear una nueva publicacion
const createPost = {
    type: PostType,
    description: "Crea un nuevo post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(_, args, { verifiedUser }) {
        //creando una nueva publicacion
        const post = new Post({
            title: args.title,
            body: args.body,
            authorId: verifiedUser._id,  //usando el id del user logeado
        })
        await post.save();

        return post
    }
};


//TODO mutacion para actualizar una publicacion existente por id
const updatePost = {
    type: PostType,
    description: "actualiza un post por id",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(_, { id, title, body }, { verifiedUser }) {   //#verifiedUser contiene los datos del usuario logeado
        if (!verifiedUser) throw new Error("usuario no autorizado");   //validando usuario logeado

        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, authorId: verifiedUser._id },
            {
                title,
                body
            },
            {
                new: true,
                runValidators: true
            }
        )
        return updatedPost;
    }
};


//TODO mutacion para eliminar una publicacion
const deletePost = {
    type: GraphQLString,
    description: "Elimina una publicacion",
    args: {
        postId: { type: GraphQLID },
    },

    async resolve(_, { postId }, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error("usuario no autorizado"); //validando token
        }

        const postDeleted = await Post.findOneAndDelete({
            _id: postId,
            authorId: verifiedUser._id
        });
        if (!postDeleted) throw new Error("Post no encontrado")

        return "Post eliminado"
    },
};


//TODO mutacion para agrgar un comentario a una publicacion
const addComment = {
    type: CommentType,
    description: "agrega comentarios a una publicacion",
    args: {
        comment: { type: GraphQLString },
        postId: { type: GraphQLID },
    },
    async resolve(_, { comment, postId }, { verifiedUser }) {
        const newComment = new Comment({
            comment,
            postId,
            userId: verifiedUser._id   //id del usuario logeado
        });
        return newComment.save();
    },
};


//TODO mutacion para actualizar un commentario existente por id
const updateCommet = {
    type: CommentType,
    description: "actualizando un comentario",
    args: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
    },
    async resolve(_, { id, comment }, { verifiedUser }) {

        if (!verifiedUser) throw new Error("No estas autorizado");

        const commentUpdated = await Comment.findOneAndUpdate(
            {
                _id: id,
                userId: verifiedUser._id,
            },
            {
                comment,
            }
        );

        if (!commentUpdated) throw new Error("comentario no encontrado")

        return commentUpdated;
    }
}


//TODO mutacion para eliminar un comentario de una publicacion
const deleteComment = {
    type: GraphQLString,
    description: "elimina commentarios",
    args: {
        id: { type: GraphQLID }
    },
    async resolve (_, {id}, {verifiedUser}) {
        
        if (verifiedUser.email != verifiedUser.email) throw new Error("usuario no autorizado");

        const commentDelete = await Comment.findOneAndDelete({
            _id: id,
            userId: verifiedUser._id,
        });
        
        console.log(commentDelete);

        if(!commentDelete) throw new Error("comentario no encontrado");

        return "Comment deleted"
    }
}

module.exports = { register, login, createPost, updatePost, deletePost, addComment, updateCommet, deleteComment };