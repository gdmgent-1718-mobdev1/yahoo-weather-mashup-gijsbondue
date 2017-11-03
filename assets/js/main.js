function App(){
    let _weatherServices,
        _weatherHtmlElement,
        _currentWeatherData
        ;
    function init (){
        console.log('1 Initialize the application');
        console.log('1.1 Create a weatherStatesService object');
        // zie services.js
        _weatherServices  = new WeatherStateServices();
        console.log('1.2 Chache the active DOM-elements');
        _weatherHtmlElement = document.querySelector('.weather-states')
        _weatherHtmlElement.innerHTML = "<h1>Weather</h1>"
        console.log('1.3 load data')
        loadWeatherState();
    }

    function loadWeatherState(){
        console.log("data klaarstomen en dan de refresch functie doen")
        _weatherServices.loadWeatherState()
            .then(function (data){
                _currentWeatherData = data;
                _currentWeatherData = _currentWeatherData.query.results.channel
                console.log(_currentWeatherData);
                updateWheater();
            }).catch(function(reject){
                console.log("péch!")
            }
            )
    }

    function updateWheater(){
        console.log('3.1 Loop through the wheater states');
        let tempStr = " ";
        let forecast = 9;
        console.log(_currentWeatherData.title);       
      tempStr += `<div id='container'>
        <h4>${_currentWeatherData.location.city}, ${_currentWeatherData.location.country}, ${_currentWeatherData.location.region}. </h4>
        <h4>forecast:</h4>
            <ol>` /*
            
         forecast.forEach(function(element) {
            tempStr +=    
            `<li>${_currentWeatherData.item.forecast[element].day} ${_currentWeatherData.item.forecast[1].date}</li>
                <ul>
                    <li>high: ${_currentWeatherData.item.forecast[element].high}</li>
                    <li>low: ${_currentWeatherData.item.forecast[element].low}</li>
                    <li>
                </ul>
            </ol>`
            },/*this);
                */         
        tempStr +=`<h4>At the moment:</h4>
        <ul>
        <li>Wind</li>        
            <ul>
                <li>chill: ${_currentWeatherData.wind.chill}</li>
                <li>direction: ${_currentWeatherData.wind.direction}°</li>
                <li>speed: ${_currentWeatherData.wind.speed} km/u</li>            
            </ul>
            <li>Astronomy</li>
            <ul>
            <li>Sunrise: ${_currentWeatherData.astronomy.sunrise}</li>
            <li>Sunrise: ${_currentWeatherData.astronomy.sunset}</li>                
            </ul>
        </ul>
        </div>
        ` 

        _weatherHtmlElement.innerHTML += tempStr;  

    }
    return{
        init: init
    }

};

window.addEventListener('load', function(ev){
    const app = new App();
    app.init();
})