var Auth = require('./Authentication.js');
var Commands = require('./Commands.js');
var State = require('./State.js');

Auth.sendCommand(() => {
    Commands.defrost((res) => {
        //console.log('max-defrost activated: ' + res)
    })
})
