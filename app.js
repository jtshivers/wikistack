const morgan = require('morgan');
const express = require('express')
const { db, Page, User } = require('./models/index');
const wiki = require('./routes/wiki')
const users = require('./routes/users')

const app = express()

app.use(morgan())
app.use(express.static('public'))
app.use(express.json())

app.use('/wiki', wiki)
app.use('/users', users)

app.get('/', (req, res, next) => {
    // const msg = 'hello world!!'
    // res.redirect(index.main(''))
    res.redirect('/wiki')
})

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })


const PORT = 3000

const init = async () => {
    // await Page.sync();
    // await User.sync();
    await db.sync({force: true})
    // make sure that you have a PORT constant
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  
init();