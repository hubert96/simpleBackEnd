const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    skills: [
        {
            skill: {type: String},
            level: {type: Number}
        }
    ]
}, { collection : 'user' });

const User = mongoose.model('User', userSchema);

module.exports = User;

/*
db.user.updateOne({'username':'egon'},{$set:
            {
                'skills.$[0].skill': 'Pranie'
            }
        },
        {
         upsert: true
        }
);



db.user.update(
    {"username": "ziomek"},
    {$set: {
            "skills.$.skill.0": "Paplanie"
    }}
);*/
