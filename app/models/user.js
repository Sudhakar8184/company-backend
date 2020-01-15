const mongoose = require('mongoose')
let Schema = mongoose.Schema
var userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        default:''
    },
    email:{
        type:String,
        trim:true,
        default:''
    },
    desgination:{
        require:()=>{ return (this.role == 'user')?true:false},
        type:String,
        trim:true,
        default:''
    },
    phone:{
        type:String,
        trim:true,
        default:''
    },
    role:{
        type:String,
        enum:['user',,'admin'],
        default:'admin'
    },
    password:{
        type:String,
        trim:true,
        default:''
    },
    reportsto:{
        type: Schema.Types.ObjectId,
        ref: 'Reportstos'
    }
})

module.exports = mongoose.model('Users',userSchema)