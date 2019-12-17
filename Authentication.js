var axioslib = require('axios');
var fs = require('fs');

let Endpoints;

var env = JSON.parse(fs.readFileSync('env.json', 'utf8'));

let checkingStateInterval;

const axios = axioslib.create({
    baseURL: env.baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TeslaApp/3.4.4-350/fad4a582e/android/9.0.0',
        'Authorization': ''
    }
});

module.exports.sendCommand = (callback) => {
    login(() => {
        getVehicles(() => {
            wake(() => {
                checkOnline(() => {
                    callback()
                })
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
            module.exports.access_token = response.data.access_token;
            axios.defaults.headers.Authorization = 'bearer ' + module.exports.access_token

            callback();
        })
        .catch((error) => {
            console.log(error);
        });
}

let getVehicles = (callback) => {
    axios.get('/api/1/vehicles/')
        .then((response) => {
            fs.readFile("endpoints.json", "utf8", (err, data) => {
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
    axios.get(Endpoints.VEHICLE_DATA.URI)
        .then((response) => {
            if (response.data.response.state == 'online') {
                //console.log('Tesla online');
                clearInterval(checkingStateInterval);
                callback();
            } else {
                //console.log('Tesla asleep, trying again in 2 seconds');
                checkingStateInterval = setInterval(() => {
                    checkOnline(callback)
                }, 2000);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports.axios = axios;
