require('./../../app/models/user')
require('./../../app/models/report')
module.exports = function(app){
    app.get('/',(req,res)=>{
        res.json({success:true,meassage: "mainpage"})
    })
    app.use('/api/v1',require('./v1'))
}