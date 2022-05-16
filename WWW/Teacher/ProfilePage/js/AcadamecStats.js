let ctx = document.getElementById('myChart').getContext('2d');
let chartType = document.getElementById('chartType')

function changeChartType(){
    change(chartType.value)
}


var config = {
    type: 'line',
    options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  },
    data:{
        labels: ['2018','2019','2020', '2021', '2022'],
        datasets: [{
          label: 'Average courses Rating',
          data: [4, 3.5, 3, 4, 5, 4],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ]
          
        }]
}
}
let myChart = new Chart(ctx, config )


function change(newType) {
    let newChart = document.getElementById("myChart").getContext("2d");
    
    myChart.destroy();
  
    var temp = jQuery.extend(true, {}, config);
    temp.type = newType;
    myChart = new Chart(newChart, temp);
  };

  /* Gpa */


let gpaChartObject = document.getElementById('GpaChart').getContext('2d');

const labels = ["Semester Gpa", "Cumulative Gpa"];
const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [3.7, 3.8],
    fill: false,
    backgroundColor: [
        '#86BBBD',
      '#8692A6'
    
    ],
    borderColor: [
      '#76949F',
      '#76949F'
    ],
    borderWidth: 1
  }]
};

const gpaChartConfig = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
    }
  };

let gpaChart = new Chart(gpaChartObject, gpaChartConfig )



/* Average Gpa */

window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
    axisY: {
      lineColor: "#4F81BC",
      tickColor: "#4F81BC",
      labelFontColor: "#4F81BC"
    },
    axisY2: {
      suffix: "%",
      lineColor: "#C0504E",
      tickColor: "#C0504E",
      labelFontColor: "#C0504E"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Algebra I", y: 44853 },
        { label: "Algebra II", y: 36525 },
        { label: "Statistics", y: 23768 },
        { label: "numerical analysis", y: 19420 }
      ]
    }]
  });
  chart.render();
  createPareto();	
  
  function createPareto(){
    var dps = [];
    var yValue, yTotal = 0, yPercent = 0;
  
    for(var i = 0; i < chart.data[0].dataPoints.length; i++)
      yTotal += chart.data[0].dataPoints[i].y;
  
    for(var i = 0; i < chart.data[0].dataPoints.length; i++){
      yValue = chart.data[0].dataPoints[i].y;
      yPercent += (yValue / yTotal * 100);
      dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
    }
    
    chart.addTo("data",{type:"line", yValueFormatString: "0.##\"%\"", dataPoints: dps});
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", yTotal);
    chart.axisY2[0].set("maximum", 100);
  }
  
  }
