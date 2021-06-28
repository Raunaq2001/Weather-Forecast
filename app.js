const express=require("express");
const app=express();
const https=require("https");
const ejs=require("ejs");
var bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const cityName=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=d155d4fd2a9f1493529756c1d030b63d&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const dataReceived=JSON.parse(data);
      const iconID=dataReceived.weather[0].icon;
      const weatherIcon="http://openweathermap.org/img/wn/"+iconID+"@2x.png";
      console.log(weatherIcon);
      var myObj={
        Temperature: dataReceived.main.temp,
        feelsLike: dataReceived.main.feels_like,
        temperatureMin: dataReceived.main.temp_min,
        temperatureMax: dataReceived.main.temp_max,
        humidity: dataReceived.main.humidity,
        pressure: dataReceived.main.pressure,
        icon: weatherIcon
      };
      res.render("forecast",{Obj:myObj});
      res.send();
    });
  });
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Listening to port 3000");
});
