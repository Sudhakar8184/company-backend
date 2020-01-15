var mongoose = require('mongoose')
var User = mongoose.model('Users')
var Reportsto = mongoose.model('Reportstos')
var bcrypt = require('bcrypt');
var jwtService = require('./v1/auth')
module.exports = {
  signup: async (req, res) => {
    try {
      let data = JSON.parse(JSON.stringify(req.body));
      let useremail = await User.find({ email: data.email }).count();
      if (!useremail) {
        var user = new User(data);
        user.password = bcrypt.hashSync(data.password, 10);
        let userdata = await user.save();
        if (userdata) return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (error) {
      return res.json({ success: false, data: error });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      let data = JSON.parse(JSON.stringify(req.body));
      const user = await User.find({ email: data.email });
      if (user.length) {
        console.log(data.password, user);
        if (bcrypt.compareSync(data.password, user[0].password))
          return res.json({
            success: true, data: {
              role: user[0].role,
              token: jwtService.createToken(user[0]),
              _id: user[0]._id
            }
          });
        else
        throw new Error('password is not vaild')
      } else {
        throw new Error('email is not vaild')
      }
    } catch (error) {
      return res.json({ success: false, data: error });
    }
  },
  addTeamMember: async (req, res) => {
    try {
      let data = JSON.parse(JSON.stringify(req.body));
      let useremail = await User.find({ email: data.email }).count();
      if (!useremail) {
        var user = new User(data);
        user.password = bcrypt.hashSync(data.password, 10);
        user.role = "user"
        let reportsto = new Reportsto({
          user: user._id,
          toreport: data.reportsto ? data.reportsto : '',
        })
        await reportsto.save()
        let promise = [];
        if (data.reportsto && data.reportsto.length) {
          data.reportsto.map((ele) => {
            promise.push(Reportsto.update({ user: ele }, { $addToSet: { direct: user._id } }))
            promise.push(Reportsto.update({ $and: [{ direct: { $in: ele } }, { direct: { $nin: user._id } }] }, { $addToSet: { indirect: user._id } }))
          })
        }
        await Promise.all(promise)
        user.reportsto = reportsto._id
        await user.save()
        return res.json({ success: true });
      } else {
        throw new Error('email already exist')
      }
    } catch (error) {
      return res.json({ success: false, data: error });
    }
  },
  getUsers: async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.query))
    console.log(data)
    const user = await User.find({ role: 'user' })
    if (user) {
      return res.json({ success: true, data: user })
    } else {
      return res.json({ success: false })
    }
  },
  getUserDetails: async (req, res) => {
    try{
      let data = JSON.parse(JSON.stringify(req.query))
      console.log(data)
      const user = await User.findOne({_id:req.user.id }).populate({
        path:'reportsto',
        populate:{
          path:'toreport direct indirect'
        }
      })
      if (user) {
        return res.json({ success: true, data: user })
      } else {
        throw new Error()
      }
    } catch(error){
      return res.json({ success: false ,data: error})
    }
   
  }
};