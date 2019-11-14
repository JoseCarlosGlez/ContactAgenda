import * as mongoose from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required:'Enter a email'    
    },
    company: {
        type: String            
    },
    phone: {
        type: Number,
        required:'Enter a number phone',
        unique:true         
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User not Found']

    },
    created_date: {
        type: Date,
        default: Date.now
    }

})

ContactSchema.plugin(uniqueValidator,{message:'Error, expected {PATH} to be unique'})


export default   mongoose.model('Contact',ContactSchema)