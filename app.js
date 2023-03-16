window.addEventListener("load", () => {
  buscarLocalizacao();
});

const cidadeInput = document.getElementById("cidade");
cidadeInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarDados();
  }
});

function buscarLocalizacao() {
  navigator.geolocation.getCurrentPosition(posicao => {
    const latitude = posicao.coords.latitude;
    const longitude = posicao.coords.longitude;
    //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    buscarDados({ latitude, longitude });
  }, erro => {
    alert(`Não foi possível obter a localização. Erro: ${erro.message}`);
  });
}

function buscarDados(coordenadas) {
  const apiKey = "eb7734c1aba3afea232fb5b9197ed7d1";
  let url = "";

  if (coordenadas) {
    const { latitude, longitude } = coordenadas;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  } else {
    const cidade = document.getElementById("cidade").value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;
  }

  //console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      mostrarDados(data);
    })
    .catch(erro => console.error(`Erro ao obter os dados: ${erro}`));
}

function mostrarDados(data) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperatura atual: ${Math.round(data.main.temp)}°C</p>
    <p>Sensação térmica: ${Math.round(data.main.feels_like)}°C</p>
    <p>Umidade: ${data.main.humidity}%</p>
    <p>Velocidade do vento: ${data.wind.speed} m/s</p>
  `;
}
