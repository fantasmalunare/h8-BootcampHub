const express = require('express')
const router = require('./routers/router')
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})