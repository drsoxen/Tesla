var Auth = require('./Authentication.js');

module.exports.getData = (callback) => {
    Auth.axios.get(Auth.Endpoints.VEHICLE_DATA.URI)
        .then((response) => {
            callback(response.data.response)
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports.getBattery = (callback) => {
    Auth.axios.get(Auth.Endpoints.CHARGE_STATE.URI)
        .then((response) => {
            callback(response.data.response)
        })
        .catch((error) => {
            console.log(error);
        })
}