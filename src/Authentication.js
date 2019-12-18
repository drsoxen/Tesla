var axioslib = require('axios');
var fs = require('fs');

let Endpoints;

var env = JSON.parse(fs.readFileSync('../env.json', 'utf8'));

let checkingStateInterval = null;

const axios = axioslib.create({
    baseURL: env.baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TeslaApp/3.4.4-350/fad4a582e/android/9.0.0',
        'Authorization': ''
    }
});

module.exports.sendCommand = (params) => {
    login(() => {
        getVehicles(() => {
            wake(() => {
                checkOnline(() => {
                    axios.post(Endpoints[params.endpoint].URI, params.args)
                        .then((response) => {
                            params.callback(response.data.response.result)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            })
        })
    })
}

module.exports.getState = (params) => {
    login(() => {
        getVehicles(() => {
            axios.get(Endpoints[params.endpoint].URI)
                .then((response) => {
                    params.callback(response.data.response)
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    })
}

let login = (callback) => {
    axios.post('/oauth/token', {
            email: env.email,
            password: env.password,
            client_id: env.client_id,
            client_secret: env.client_secret,
            grant_type: 'password',
        })
        .then((response) => {
            axios.defaults.headers.Authorization = 'bearer ' + response.data.access_token

            callback();
        })
        .catch((error) => {
            console.log(error);
        });
}

let getVehicles = (callback) => {
    axios.get('/api/1/vehicles/')
        .then((response) => {
            fs.readFile("../public/endpoints.json", "utf8", (err, data) => {
                Endpoints = JSON.parse(data.replace(/{vehicle_id}/g, response.data.response[0].id_s))
                module.exports.Endpoints = Endpoints;
                callback();
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

let wake = (callback) => {
    axios.post(Endpoints.WAKE_UP.URI, {})
        .then((response) => {
            callback();
        })
        .catch((error) => {
            console.log(error);
        });
}

let checkOnline = (callback) => {
    axios.get(Endpoints.VEHICLE_SUMMARY.URI)
        .then((response) => {
            if (response.data.response.state == 'online') {
                clearInterval(checkingStateInterval);
                checkingStateInterval = null;
                callback();
            } else {
                if (!checkingStateInterval) {
                    checkingStateInterval = setInterval(() => {
                        checkOnline(callback)
                    }, 2000);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports.axios = axios;