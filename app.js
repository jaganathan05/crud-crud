const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const sequelize = require('./helpers/database');

const app = express();

const adminRoutes = require('./routes/appointment');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended : false} ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(adminRoutes);


app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not found</h1.')
})

sequelize.sync().then(res=>{
    //console.log(res)
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})