const mongoose = require('mongoose')
let Schema = mongoose.Schema
var reportstoSchema = new Schema({
    user:{
            type: Schema.Types.ObjectId,
           
    },
    toreport:[{
            type: Schema.Types.ObjectId,
            ref: 'Users'
    }],
    direct:[{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    indirect:[{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

module.exports = mongoose.model('Reportstos',reportstoSchema)