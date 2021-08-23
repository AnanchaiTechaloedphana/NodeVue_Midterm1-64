let express = require('express');
const {sequelize} = require('./models');
let cors = require('cors')
const config = require('./config/config');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cors())

// var func = require('./routes.js');
// func(app);
require('./routes')(app)

// app.get('/status', function(req,res){
//     res.send('Hello nodejs server');
// })

// app.get('/hello/:person', function(req,res){
//     console.log('hello -'+req.params.person);
//     res.send('say hello with ' + req.params.person);
// })

app.get('/status', function(req,res){
    res.send('Hello nodejs server');
})

app.get('/hello/:person', function(req,res){
    console.log('hello -'+req.params.person);
    res.send('say hello with ' + req.params.person);
})

app.get('/user/:userId', function(req,res){
    res.send('ดูข้อมูลไวน์' + req.params.userId);
})

app.get('/users', function(req,res){
    res.send('เรียกข้อมูลผู้ใช้งานทั้งหมด')
})

app.post('/user/', function(req,res){
    res.send('ทำการสร้างข้อมูลไวน์ ' + JSON.stringify(req.body))
})

app.put('/user/:userId', function(req,res){
    res.send('ทำการแก้ไขข้อมูลไวน์' + req.params.userId + ' : '+
    JSON.stringify(req.body));
})

app.delete('/user/:userId', function(req,res){
    res.send('ทำการลบข้อมูลไวน์' + req.params.userId + ' : '+
    JSON.stringify(req.body));
})


let port = process.env.PORT || config.port;
sequelize.sync({force: false}).then(() =>{
    app.listen(port, function(){
        console.log('server running on ' + port);
    })
})
