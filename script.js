console.log("Welcome to weather app");

let city ="Manila";


let cityMonth;
let cityDate;
let cityYear;
let cityDay;
let cityTime;
async function getData(newCity) {
    try{
        const requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+newCity+'&appid=01f9154ebcd50215ad1f3cfe738845d3';
        const request = new Request(requestURL);
    
        const response = await fetch(request);
        const currentWeather = await response.json();
        
        let weatherMain=currentWeather.weather[0].main;
        let weatherDescription=currentWeather.weather[0].description;
        let weatherIcon=currentWeather.weather[0].icon;
        let mainTempCel=Math.round(currentWeather.main.temp-273.15)+'°C';
        let mainTempFar=Math.round(1.8*(currentWeather.main.temp-273) + 32)+'°F';

        
        let feelsLikeTempCel=Math.round(currentWeather.main.feels_like-273.15)+'°C';
        let feelsLikeTempFar=Math.round(1.8*(currentWeather.main.feels_like-273) + 32)+'°F';
     
         
        let humidity=currentWeather.main.humidity+"%";
        let windSpeedKPH=Math.round((currentWeather.wind.speed*3.6)*10)/10+' km/h';
        let windSpeedMPH=Math.round((currentWeather.wind.speed*2.2369)*10)/10+' mph';
        let timeDt=currentWeather.dt+" unix";
        let cityName=currentWeather.name;
        let country=currentWeather.sys.country;
        let pressure=currentWeather.main.pressure;
        let timezone=currentWeather.timezone;
        
    console.log(currentWeather);
    console.log('current weather is '+weatherMain);
    console.log('description '+weatherDescription);
    console.log(weatherIcon);
    console.log('in celclius '+mainTempCel);
    console.log('in farenheight '+mainTempFar);
    console.log('feels like C '+feelsLikeTempCel);
    console.log('feels like F '+feelsLikeTempFar);
    console.log('Humidity: '+humidity);
    console.log('Winspeed: '+windSpeedKPH);
    console.log('Winspeed: '+windSpeedMPH);
    console.log('Time and date: '+timeDt);
    console.log('City: '+cityName);
    console.log('Country: '+country);
    console.log('pressure is:'+pressure);
    console.log('timezone is: '+timezone);
    getDateTime(timezone)
    console.log(cityMonth);
    console.log(cityDate);
    console.log(cityYear);
    console.log(cityDay);
    console.log(cityTime);

    populate(weatherMain,weatherDescription,weatherIcon,mainTempCel,mainTempFar,feelsLikeTempCel,feelsLikeTempFar,humidity,windSpeedKPH,
        windSpeedMPH,timeDt,cityName,country,pressure,timezone,cityMonth,cityDate,cityYear,cityDay,cityTime);
    }catch{
        document.getElementById("message").innerHTML = "City does not exist!";
    }
   
}


function getDateTime(timezone){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let tz=timezone;
var d = new Date((new Date().getTime())+tz*1000);

let dateString=d.toISOString();

//let dateString=d.toISOString()
//""2020-12-26T13:50:09.012Z""
let year=dateString.slice(0, 4);


let month=dateString.slice(5, 7);
let monthName=monthNames[month-1];


let date=dateString.slice(8,10);


let hours=dateString.slice(11, 13);


let mins=dateString.slice(14, 16);


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var dayName = days[new Date((new Date().getTime())-36000*1000).getDay()];

let time=getTime(hours);
function getTime(hours){
    let currentTime;
    if(hours>=12){
        hours=hours-12;
        if(hours==0){
            hours="12";
        }else if(hours<10){
            hours="0"+hours;
        }
        currentTime=hours+":"+mins+" PM";
    }else{
        if(hours==0){
            hours="12";
        }else if(hours<10){
            hours="0"+hours;
        }
        currentTime=hours+":"+mins+" AM";
    }
    
    return currentTime;
}

let dateTime=monthName+" "+date+" "+year+" "+dayName+" "+time;

cityMonth=monthName;
cityDate=date;
cityYear=year;
cityDay=dayName;
cityTime=time;
}


function populate(weatherMain,weatherDescription,weatherIcon,mainTempCel,mainTempFar,feelsLikeTempCel,feelsLikeTempFar,humidity,windSpeedKPH,
    windSpeedMPH,timeDt,cityName,country,pressure,timezone,cityMonth,cityDate,cityYear,cityDay,cityTime){
    
    let THE_WEATHER = weatherMain.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let THE_WEATHER_DESCRIPTION = weatherDescription.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    document.getElementById("message").innerHTML = "";
    document.getElementById("currentWeather").innerHTML = THE_WEATHER;
    document.getElementById("currentWeatherDescription").innerHTML = THE_WEATHER_DESCRIPTION;
    document.getElementById("location").innerHTML =cityName+", "+country;
    document.getElementById("tempC").innerHTML=mainTempCel;
    document.getElementById("tempF").innerHTML=mainTempFar;
    document.getElementById("date").innerHTML=cityDay+", "+cityMonth+" "+cityDate+", "+cityYear;
    document.getElementById("time").innerHTML=cityTime;
    document.getElementById("feelslikeC").innerHTML=feelsLikeTempCel;
    document.getElementById("feelslikeF").innerHTML=feelsLikeTempFar;
    document.getElementById("humidity").innerHTML=humidity;
    document.getElementById("speedkph").innerHTML=windSpeedKPH;
    document.getElementById("speedmph").innerHTML=windSpeedMPH;
    document.getElementById("pressure").innerHTML=pressure+" hPa";
    document.getElementById("weatherIcon").src = "src/"+weatherIcon+".png";
}
getData(city);   
function checkWeather(){
    const val = document.querySelector('input').value;
    document.querySelector('input').value="";
    getData(val); 
}