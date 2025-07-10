let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 1000);
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    clearInterval(timer);
  }
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  elapsedTime = 0;
  document.getElementById("time").textContent = "00:00:00";
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  let totalSeconds = Math.floor(elapsedTime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  document.getElementById("time").textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return (unit < 10) ? "0" + unit : unit;
}

function saveTime() {
  const time = document.getElementById("time").textContent;
  fetch('/save_time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ time: time }),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("savedTimes").innerHTML += `<li>${time}</li>`;
      updateChart();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateChart() {
  fetch('/get_saved_times')
    .then(response => response.json())
    .then(data => {
      const timeData = data.times.map(t => {
        if (t.includes(':')) {
          const parts = t.split(':').map(Number);
          return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return parseFloat(t) || 0;
      });
      drawChart(timeData);
    });
}
