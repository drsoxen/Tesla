var Auth = require('./Authentication.js');

module.exports.defrost = (callback) => {
    Auth.axios.post(Auth.Endpoints.MAX_DEFROST.URI, {
            "on": true
        })
        .then((response) => {
            callback(response.data.response.result)
        })
        .catch((error) => {
            console.log(error);
        });
}