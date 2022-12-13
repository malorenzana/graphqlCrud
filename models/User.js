const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        require: true,
        select: false
    },

    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            'por favor ingresa un correo valido'
        ],
    },

    displayName: {
        type: String,
        require: true,
    },
}, 
{
    timestamps: true,
    versionKey: false
});

module.exports = model("User", userSchema);