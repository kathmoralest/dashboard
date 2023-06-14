(
function(){
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,temperature_80m,uv_index&timezone=auto';
fetch( URL )
  .then(response => response.json())
  .then(data => {
    let timezone = data['timezone']
    let latitude = data['latitude']
    let longitude = data['longitude']
    let timezone_abbreviation = data['timezone_abbreviation']
    let timezoneHTML= document.getElementById('timezone_abbreviation')

    timezoneHTML.textContent=timezone
    timezone_abbreviationHTML.textContent=timezone_abbreviation


    console.log(data);
  })
  .catch(console.error);
}
)();