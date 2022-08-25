const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let tz=28800;
var d = new Date((new Date().getTime())+tz*1000);

let dateString=d.toISOString();
console.log(dateString)
console.log(typeof(dateString));
//let dateString=d.toISOString()
//""2020-12-26T13:50:09.012Z""
let year=dateString.slice(0, 4);
console.log(year);

let month=dateString.slice(5, 7);
let monthName=monthNames[month-1];
console.log(monthName)

let date=dateString.slice(8,10);
console.log(date);

let hours=dateString.slice(11, 13);
console.log(hours);

let mins=dateString.slice(14, 16);
console.log(mins);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var dayName = days[new Date((new Date().getTime())-36000*1000).getDay()];
console.log("day index "+dayName)
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
    console.log(currentTime);
    return currentTime;
}

let dateTime=monthName+" "+date+" "+year+" "+dayName+" "+time;
console.log(dateTime);

