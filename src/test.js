var Auth = require('./Authentication.js');

Auth.getState(({
    callback: (data) => {
        console.log(data.state);
    },
    endpoint: "VEHICLE_DATA"
}))





