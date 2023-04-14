window.addEventListener("load", () => {
  buscarLocalizacao();
});

const cidadeInput = document.getElementById("cidade");
cidadeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarDados();
  }
});

function buscarLocalizacao() {
  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      const latitude = posicao.coords.latitude;
      const longitude = posicao.coords.longitude;
      buscarDados({ latitude, longitude });
      console.log(latitude, longitude);
    },
    (erro) => {
      alert(`Não foi possível obter a localização. Erro: ${erro.message}`);
    }
  );
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

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mostrarDados(data);
    })
    .catch((erro) => console.error(`Erro ao obter os dados: ${erro}`));
}

function mostrarDados(data) {
  const nameCity = document.getElementById("cidade");
  nameCity.innerHTML = `${data.name}, ${data.sys.country}`;

  const temp = document.getElementById("temperatura");
  temp.innerHTML = `${Math.round(data.main.temp)}`;

  //dados de minima e maxima so estão disponiveis para planos pagos

  /*  const temp_max = document.getElementById("maxTemp");
  temp_max.innerHTML = `${Math.round(data.main.temp_max)}`;

  const temp_min = document.getElementById("minTemp");
  temp_min.innerHTML = `${Math.round(data.main.temp_min)}`;
*/
  const windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = `${data.wind.speed}<span>m/s</span>`;
  
  const humidity = document.getElementById("humidity");
  humidity.innerHTML = `${data.main.humidity}<span>%</span>`;

  /*const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperatura atual: °C</p>
    <p>Sensação térmica: ${Math.round(data.main.feels_like)}°C</p>
    <p>Umidade: ${data.main.humidity}%</p>
    <p>Velocidade do vento: ${data.wind.speed} m/s</p>
  `;*/
}
