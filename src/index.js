const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

//Connect to DB
db.connection;

//static file
app.use(express.static(path.join(__dirname, 'public'))); //tự load các file tĩnh trong thư mục public

//Template engine
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//Morgan
app.use(morgan('combined'));
//Midleware
// app.use(express.urlencoded({
//     extended:true,
// }));
// app.use(express.json);

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
