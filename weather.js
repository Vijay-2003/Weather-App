const temperaturefield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const regionfeild = document.querySelector(".weather2 div")
const datafield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const weatherfield = document.querySelector(".weather3 div");
const searchfield = document.querySelector(".find");
const form = document.querySelector("form");

let target = "pimpri";

const fetchdata = async (target) => 
{
    try
    {    
        const url = `https://api.weatherapi.com/v1/current.json?key=d5de1e1b36a84aa99fd93547231604&q=${target}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        //one way of fetch api :
        const 
        {
            current : 
            { 
                temp_c,
                condition : { text, icon },
            },
            location : { name, region, localtime },
        } = data;
 
        updateDom(temp_c, name, region, localtime, icon, text);
    
        // second way of fetch api : 
        //updateDom(data.current.temp_c, //data.location.name);
    } 
    catch (error) 
    {
        alert("Location Not Found");
    }    
};

function updateDom(temperature, city, region, time, emoji, text)
{
    temperaturefield.innerText = temperature + "°";
    cityfield.innerText = city + ",";
    regionfeild.innerText = region + ". (Region)";
    const exactTime = time.split(" ")[1];
    // 1.] console.log(time);
    // 2.] console.log(exactTime);
    const exactDate = time.split(" ")[0];
    // 3.] console.log(exactDate);
    const exactDay = new Date(exactDate).getDay();
    // 4.] console.log(exactDay);
    // 5.] console.log(getDayFullName(0));
    datafield.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`
    emojifield.src = emoji; 
    weatherfield.innerText = text;
}
fetchdata(target);


function getDayFullName (num) 
{
    switch (num) 
    {
        case 0 : return "Sunday";
            
        case 1 : return "Monday";
            
        case 2 : return "Tuesday";
            
        case 3 : return "Wednesday";
            
        case 4 : return "Thursday";
            
        case 5 : return "Friday";
            
        case 6 : return "Saturday";
            
        default : 
            return "Dont Know";
    }
    
}

const find = (e) => 
{
    e.preventDefault();
    target =  searchfield.value;
    // console.log(target);
    fetchdata(target);
}
form.addEventListener("submit",find);