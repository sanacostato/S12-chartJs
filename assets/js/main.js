console.log("Entro al main.js");

const tblDatos = document.getElementById("tblDatos");
const ctx = document.getElementById('myChart').getContext('2d');

function loadData(){
    console.log("entro a cargar data");
    fetch("http://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_ingresos_mensuales",
    {
        method: "GET"
    })
    .then(response => response.json())
    .then(result => {
        // console.log(result.data.map(item => item.nombre));
        const labels_for_chart = result.data.map(item => item.nombre);
        const data_for_chart = result.data.map(item => item.monto); //eso para pasar los datos de la api a la pagina un arreglo

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels_for_chart,
                datasets: [{
                    label: '# of Votes',
                    data: data_for_chart,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        tblDatos.innerHTML = "";
        for (const registro of result.data) {
            let tr = `

            <tr>

                <td>${registro.id}</td>

                <td>${registro.nombre.toUpperCase()}</td>

                <td>${registro.monto}</td>

            </tr>`;
            tblDatos.innerHTML  += tr; // esto hace que aparezcan los datos
        }
    }).catch(error => {
        console.log (error);
    });
}
loadData();



