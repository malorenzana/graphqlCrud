const { Schema, model, version } = require('mongoose')

const commentSchema = new Schema ({
    comment:{
        type: String,
        require: true
    },
    userId:{
        type: String,
        require: true
    },
    postId:{
        type: String,
        require: true
    },
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model("Comment", commentSchema);