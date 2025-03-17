
// Fetch weather data and display it
const apiUrl = "https://api.weatherstack.com/current";
const accessKey = "a03eac5256957ed2a2c4e214d052d2c4"; // Replace with your actual access key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  
  if (city === "") {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  const fullUrl = `${apiUrl}?access_key=${accessKey}&query=${city}`;

  fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        weatherResult.textContent = "City not found. Please try again.";
      } else {
        const { temperature, weather_descriptions, humidity } = data.current;
        weatherResult.innerHTML = `
          <strong>${city}</strong><br>
          Temperature: ${temperature}°C<br>
          Condition: ${weather_descriptions[0]}<br>
          Humidity: ${humidity}%
        `;
        console.log("Data", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      weatherResult.textContent = "Something went wrong. Please try again.";
    });
});