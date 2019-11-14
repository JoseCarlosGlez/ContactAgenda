import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})
UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique' })


export default mongoose.model('User', UserSchema)