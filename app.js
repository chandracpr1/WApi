const express = require("express");
const { STATUS_CODES } = require("http");
const app = express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res) {
    
    const query=req.body.CityName ;
    const appId="34de4f59844741158374f52fbf21d17f" ;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+appId;
    https.get(url,function(response) {
        console.log(response.statusCode);
        response.on("data",function(data) {
            const weatherData=JSON.parse(data);
            const Temp=weatherData.main.temp;
            const Description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const icon_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The temperature in "+query+" is "+Temp+"</p>");
            res.write("<h1>The weather is currently "+Description+" .</h1>")
            res.write("<img src="+icon_url+">")
            res.send();
        })
    })
})



app.listen(3000,function() {
    console.log("Server is running on port 3000");
})