console.log('Client side javascript file is loaded!');

function getWeatherDetails() {
    console.log(locationName.value);
}

async function loadWeatherDetails(event) {
    event.preventDefault();
    $('#weatherDetailsDiv').empty();
    $('#weatherDetailsDiv').append(`<p id="info">Loading...</p>`)
    var response = await fetch(`http://localhost:3000/weather?address=${locationName.value}`);
    if (response.status == 200) {
        var responseData = await response.json();
        $('#weatherDetailsDiv').empty();
        if (responseData.error) {
            $('#weatherDetailsDiv').append(`<p id="error">error: ${responseData.error}</p>`)
        } else {
            $('#weatherDetailsDiv').append(`<p id="info"><label>address</label>: ${responseData.address}</p>`)
            $('#weatherDetailsDiv').append(`<p id="info"><label>place</label>: ${responseData.place}</p>`)
            $('#weatherDetailsDiv').append(`<p id="info"><label>weather</label>: ${responseData.forecastData}</p>`)
        }
    } else {
        console.log(response);
    }
}