$(document).ready(() => {

    $("#BatteryStatusBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/battery',
            success: (res) => {
                console.log(res);
            }
        });
    });

    $("#ClimateStatusBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/climate',
            success: (res) => {
                console.log(res);
            }
        });
    });

    $("#HonkHornBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/honk',
            success: (res) => {
                console.log(res);
            }
        });
    });

    $("#MaxDefrostBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/defrost',
            success: (res) => {
                console.log(res);
            }
        });
    });

    $("#StartHVACBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/climate_on',
            success: (res) => {
                console.log(res);
            }
        });
    });

    $("#StopHVACBtn").click(() => {
        $.ajax({
            type: "GET",
            url: '/climate_off',
            success: (res) => {
                console.log(res);
            }
        });
    });
});