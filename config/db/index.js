const mongoose = require('mongoose')
let dblink = process.env.DB_URL
mongoose.connect(dblink, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (!err) {
      console.log('Database connected successfully');
    } else {
      console.log('mongoose connection failed')
    }
  });
mongoose.set('debug', true);