const weatherIcon = document.querySelector('.weather-icon');
const iconError = document.querySelector('.icon-error');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');

const rootElement = document.documentElement;

window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError(error){
    iconError.src = "images/geolocation_disabled.png";
    weatherIcon.classList.add('d-none');
    weatherLocation.innerText = 'You need to activate geolocation';
    rootElement.classList.remove('error-loading');
}

function onSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = /* insert here your apikey */'';
    const language = 'en';
    const units = 'metric';
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
    const apiUri = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;
    iconError.classList.add('d-none');

    fetch(apiUri)
        .then(function(response){
            const data = response.json();
            return data;
        })
        .then(function(data){
            const locationName = data.name;
            const temperature = Math.floor(data.main.temp);
            const iconCode = data.weather[0].icon;
            const description = data.weather[0].description;

            const suggestion = getSuggestion(iconCode);

            weatherLocation.innerText = locationName;
            weatherTemperature.innerText = `${temperature}°`;
            weatherIcon.alt = description;
            weatherIcon.src = `images/${iconCode}.png`;
            suggestionParagraph.innerText = suggestion;

            rootElement.classList.remove('js-loading');
        });
}

function getSuggestion(iconCode){
    const suggestions = {
        '01d': 'Remember the sunscreen!',
        '01n': 'Good night!',
        '02d': 'Today the sun comes and goes...',
        '02n': 'Beware of werewolves...',
        '03d': 'Perfect light for taking pictures!',
        '03n': 'Sleep peacefully :)',
        '04d': 'What a gray sky :(',
        '04n': 'You can\'t even see the moon!',
        '09d': 'Take the umbrella',
        '09n': 'Cover up well!',
        '10d': 'Take the umbrella',
        '10n': 'Cover up well!',
        '11d': 'Watch out for lightning!',
        '11n': 'Lightning lights up the night!',
        '13d': 'Go out and make a snowman!',
        '13n': 'Perfect night to stay under the duvet!',
        '50d': 'Turn on the fog lights!',
        '50n': 'Drive carefully!',
    }
    return suggestions[iconCode];
}