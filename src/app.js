var Auth = require('./authentication.js');

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/../views');

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/defrost', (req, res) => {
    Auth.sendCommand(({
        callback: (data) => {
            res.send('<b>max-defrost activated: ' + data + '</b>')
        },
        endpoint: "MAX_DEFROST",
        args: {
            "on": true
        }
    }))
});

app.get('/climate_on', (req, res) => {
    Auth.sendCommand(({
        callback: (data) => {
            res.send(data)
        },
        endpoint: "CLIMATE_ON",
        args: {}
    }))
});

app.get('/climate_off', (req, res) => {
    Auth.sendCommand(({
        callback: (data) => {
            res.send(data)
        },
        endpoint: "CLIMATE_OFF",
        args: {}
    }))
});

app.get('/honk', (req, res) => {
    Auth.sendCommand(({
        callback: (data) => {
            res.send('Beep Beep')
        },
        endpoint: "HONK_HORN",
        args: {}
    }))
});

app.get('/climate', (req, res) => {
    Auth.getState(({
        callback: (data) => {
            res.json(data.climate_state);
        },
        endpoint: "VEHICLE_DATA"
    }))
});

app.get('/battery', (req, res) => {
    Auth.getState(({
        callback: (data) => {
            res.json(data);
        },
        endpoint: "CHARGE_STATE"
    }))
});

app.get('/', (req, res) => {
    if(Auth.loggedIn == true){
        res.render('index');
    }
    else{
        res.render('login');
    }
});

app.listen(3000, () => {
    console.log('Server Started On Port 3000');

});