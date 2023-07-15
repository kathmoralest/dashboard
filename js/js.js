let load = (data) => {

    let timeZone = data["timezone"]
    let timeZoneHTML = document.getElementById("timeZone")
    timeZoneHTML.textContent = timeZone;

    let temperature = data['hourly']['temperature_2m'][0]
    console.log(temperature);
    let temperatureHTML = document.getElementById("temperature")
    temperatureHTML.textContent = temperature + " °C";

    let uvIndex = data['daily']['uv_index_max'][0]
    let uvIndexHTML = document.getElementById("uvIndex")
    uvIndexHTML.textContent = uvIndex;

    let elevation = data["elevation"]
    let elevationHTML = document.getElementById("elevation")
    elevationHTML.textContent = elevation + " m";

    plot1(data);
    plot2(data);
}

let plot1 = (data) => {
    
    const ctx = document.getElementById('myChart1');

    const dataset = {
        labels: data.hourly.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
            data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
            fill: true,
            borderColor: '#011f4b',
            tension: 1
        }]
    };

    const config = {
        type: 'line',
        data: dataset,
    };

    const chart = new Chart(ctx, config)
}

let plot2 = (data) => {

    const ctx = document.getElementById('myChart2');

    const dataset = {
        labels: data.daily.time,
        datasets: [{
            label: 'Índice UV semanal',
            data: data.daily.uv_index_max,
            backgroundColor: [
                '#10284B',
                '#005b96',
                '#6497b1',
                '#b3cde0',
                '#CDE9FD',
                '#79D3FF',
                '#D0EFFF'
            ],
            borderColor: [
                '#011f4b',
                '#03396c',
                '#005b96',
                '#6497b1',
                '#b3cde0',
                '#2a9df4',
                '#d0efff'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: dataset,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    const chart = new Chart(ctx, config)
}

let loadInocar = () => {

    let URL_proxy = 'https://cors-anywhere.herokuapp.com/' // Coloque el URL de acuerdo con la opción de proxy
    let URL = URL_proxy + 'https://www.inocar.mil.ec/mareas/consultan.php';

    // let URL = 'https://www.inocar.mil.ec/mareas/consultan.php';

    fetch(URL)
        .then(response => response.text())
        .then(data => {
            load(data)
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/html");
            
            // console.log(data);

            let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
            let contenedorHTML = document.getElementById('table-container');
            contenedorHTML.innerHTML = contenedorMareas.innerHTML;
        })
        .catch(console.error);

}

(
    function () {
        let meteo = localStorage.getItem('meteo');

        if (meteo == null) {
            let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.13&longitude=-79.90&hourly=temperature_2m&daily=weathercode,sunset,uv_index_max&timezone=auto';
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    load(data);
                    /* GUARDAR DATA EN LA MEMORIA */
                    localStorage.setItem("meteo", JSON.stringify(data));
                })
                .catch(console.error);

        } else {

            /* CARGAR DATA DESDE LA MEMORIA */
            load(JSON.parse(meteo));

        }

        loadInocar();
    }
)();