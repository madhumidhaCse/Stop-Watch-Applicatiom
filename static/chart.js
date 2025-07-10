let myChart = null;

document.addEventListener('DOMContentLoaded', function () {
  updateChart();
});

function drawChart(data) {
  const canvas = document.getElementById('timeChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{
        label: 'Saved Times (seconds)',
        data: data,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Save #'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Time (seconds)'
          },
          beginAtZero: true
        }
      }
    }
  });
}

