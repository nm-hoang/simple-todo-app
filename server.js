const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const db = require('./services/db');
const { addHook } = require('./services/user');
// const { getLogin, postLogin} = require('./routes/login');
const port = process.env.PORT || 3000;

const app = express();
 app.use(express.static(path.join(__dirname,'public')));
//Session
app.use(cookieSession({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 *60*60*1000,
}));

app.set('views','./views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


//Auth middlewares
app.use(require('./middlewares/auth'));


app.get('/', require('./routes/index'));
app.use('/login',require('./routes/login'));
app.get('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));
app.use('/todos', require('./routes/todos'));
app.use('/register', require('./routes/register'));

// app.use(require('./middlewares/authtodolist'),
// function(req, res, next) {
//     app.use('/todolist', require('./routes/todolist'));
//     next();
// });


app.use(express.static('public'));
db.sync().then(function(){
    app.listen(port);
    console.log(`Server is listening on port ${port}`);

}).catch(function(err){
    console.error(err);
});

