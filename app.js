var Auth = require('./Authentication.js');
var Commands = require('./Commands.js');
var State = require('./State.js');

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();

app.engine('dust', cons.dust);


app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Commands
app.get('/defrost', (req, res) => {
    Auth.sendCommand(() => {
        Commands.defrost((res) => {
            res.end(res);
        })
    })  
});

//Status
app.get('/climate', (req, res) => {
    Auth.sendCommand(() => {
        State.getData((data) => {
            res.json(data.climate_state);
        })
    })
});

app.get('/battery', (req, res) => {
    Auth.sendCommand(() => {
        State.getBattery((data) => {
            res.json(data);
        })
    })
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server Started On Port 3000');

});