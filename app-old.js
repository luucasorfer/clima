function buscarDados() {
  const cidade = document.getElementById("cidade").value;
  const apiKey = "eb7734c1aba3afea232fb5b9197ed7d1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => mostrarDados(data));
}

function mostrarDados(data) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperatura atual: ${Math.round(data.main.temp - 273.15)}°C</p>
    <p>Sensação térmica: ${Math.round(data.main.feels_like - 273.15)}°C</p>
    <p>Umidade: ${data.main.humidity}%</p>
    <p>Velocidade do vento: ${data.wind.speed} m/s</p>
  `;
}

