var Auth = require('./Authentication.js');

Auth.sendCommand(({
    callback: (data) => {
        //console.log('max-defrost activated: ' + res)
    },
    endpoint: "MAX_DEFROST",
    args: {
        "on": true
    }
}))