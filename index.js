const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="a589420fb4d8e86242bbd4ab9f5865d4";

weatherForm.addEventListener("submit", async event =>{
event.preventDefault();
const city=cityInput.value;
if(city){
    try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData)

    }
    catch(error){
        console.error(error);
        displayError(error);
    }

}
else{
    displayError("Please enter the City");
}
});


async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
if(!response.ok){
    throw new Error("Couldn't fetch Data");
}
return await response.json();
;}


function displayWeatherInfo(data) {
    const {
        name: city, 
        main: { temp, humidity },
        weather: [{ description, id }]
    }=data;

    card.textContent = "";
    card.style.display = "block";
    card.style.color="white";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = `${city}`;
    tempDisplay.textContent = `${temp.toFixed(1)}°C`;
    humidityDisplay.textContent = ` Humidity: ${humidity}%`;
    descDisplay.textContent = `${getWeatherEmoji(id)} ${description}`;

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
}



function getWeatherEmoji(weatherID) {
    if (weatherID >= 200 && weatherID < 300) {
        return "⛈️"; 
    } else if (weatherID >= 300 && weatherID < 500) {
        return "🌦️"; 
    } else if (weatherID >= 500 && weatherID < 600) {
        return "🌧️"; 
    } else if (weatherID >= 600 && weatherID < 700) {
        return "❄️"; 
    } else if (weatherID >= 700 && weatherID < 800) {
        return "🌫️"; 
    } else if (weatherID === 800) {
        return "☀️"; 
    } else if (weatherID > 800 && weatherID < 900) {
        return "☁️"; 
    } else {
        return "🌈"; 
    }
}



function displayError(message){
    const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "block";
  card.appendChild(errorDisplay);   

}