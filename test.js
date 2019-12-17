var Auth = require('./Authentication.js');
var Commands = require('./Commands.js');
var State = require('./State.js');

Auth.sendCommand(() => {
    State.getData((data) => {
        console.log(data.state);
    })
})